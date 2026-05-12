package cl.rednorte.authservice.dto;

import cl.rednorte.authservice.model.EstadoUsuario;
import cl.rednorte.authservice.model.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String mensaje;
    private Long usuarioId;
    private String rut;
    private String nombre;
    private String apellido;
    private String email;
    private Rol rol;
    private EstadoUsuario estado;
}
