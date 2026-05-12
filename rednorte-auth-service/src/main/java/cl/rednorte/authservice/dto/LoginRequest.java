package cl.rednorte.authservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    // Puede ser email o RUT. Ejemplo: paciente@rednorte.cl o 18777905-7
    @NotBlank(message = "Debes ingresar email o RUT")
    private String identificador;

    @NotBlank(message = "La password es obligatoria")
    private String password;
}
