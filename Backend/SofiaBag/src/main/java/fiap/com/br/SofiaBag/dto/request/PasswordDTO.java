package fiap.com.br.SofiaBag.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordDTO {

    @NotEmpty
    private String password;

    @NotEmpty
    private String email;

}
