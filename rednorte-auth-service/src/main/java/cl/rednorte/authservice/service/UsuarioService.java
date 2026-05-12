package cl.rednorte.authservice.service;

import cl.rednorte.authservice.dto.AuthResponse;
import cl.rednorte.authservice.dto.LoginRequest;
import cl.rednorte.authservice.dto.RegistroRequest;
import cl.rednorte.authservice.dto.UsuarioResponse;
import cl.rednorte.authservice.model.EstadoUsuario;
import cl.rednorte.authservice.model.Usuario;
import cl.rednorte.authservice.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse registrarUsuario(RegistroRequest request) {
        String rutNormalizado = normalizarRut(request.getRut());
        String emailNormalizado = request.getEmail().trim().toLowerCase();

        if (usuarioRepository.existsByRut(rutNormalizado)) {
            throw new RuntimeException("El RUT ya esta registrado: " + rutNormalizado);
        }

        if (usuarioRepository.existsByEmail(emailNormalizado)) {
            throw new RuntimeException("El email ya esta registrado: " + emailNormalizado);
        }

        Usuario usuario = Usuario.builder()
                .rut(rutNormalizado)
                .nombre(request.getNombre().trim())
                .apellido(request.getApellido().trim())
                .email(emailNormalizado)
                .password(passwordEncoder.encode(request.getPassword()))
                .telefono(request.getTelefono())
                .fechaNacimiento(request.getFechaNacimiento())
                .rol(request.getRol())
                .estado(EstadoUsuario.ACTIVO)
                .build();

        Usuario guardado = usuarioRepository.save(usuario);
        return crearAuthResponse("Usuario registrado correctamente", guardado);
    }

    public AuthResponse login(LoginRequest request) {
        String identificador = request.getIdentificador().trim().toLowerCase();
        String rutNormalizado = normalizarRut(identificador);

        Usuario usuario = usuarioRepository.findByEmailOrRut(identificador, rutNormalizado)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email o RUT: " + request.getIdentificador()));

        if (usuario.getEstado() != EstadoUsuario.ACTIVO) {
            throw new RuntimeException("El usuario se encuentra inactivo");
        }

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Password incorrecta");
        }

        return crearAuthResponse("Inicio de sesion exitoso", usuario);
    }

    public UsuarioResponse buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
        return UsuarioResponse.desdeUsuario(usuario);
    }

    public UsuarioResponse buscarPorRut(String rut) {
        Usuario usuario = usuarioRepository.findByRut(normalizarRut(rut))
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con RUT: " + rut));
        return UsuarioResponse.desdeUsuario(usuario);
    }

    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioResponse::desdeUsuario)
                .toList();
    }

    private AuthResponse crearAuthResponse(String mensaje, Usuario usuario) {
        return new AuthResponse(
                mensaje,
                usuario.getId(),
                usuario.getRut(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getEmail(),
                usuario.getRol(),
                usuario.getEstado()
        );
    }

    private String normalizarRut(String rut) {
        return rut == null
                ? null
                : rut.trim().replace(".", "").replace(" ", "").toUpperCase();
    }
}
