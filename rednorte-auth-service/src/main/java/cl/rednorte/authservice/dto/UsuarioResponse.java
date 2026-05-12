package cl.rednorte.authservice.dto;

import cl.rednorte.authservice.model.EstadoUsuario;
import cl.rednorte.authservice.model.Rol;
import cl.rednorte.authservice.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UsuarioResponse {
    private Long id;
    private String rut;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private LocalDate fechaNacimiento;
    private Rol rol;
    private EstadoUsuario estado;
    private LocalDateTime fechaRegistro;

    public static UsuarioResponse desdeUsuario(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getRut(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getEmail(),
                usuario.getTelefono(),
                usuario.getFechaNacimiento(),
                usuario.getRol(),
                usuario.getEstado(),
                usuario.getFechaRegistro()
        );
    }
}
