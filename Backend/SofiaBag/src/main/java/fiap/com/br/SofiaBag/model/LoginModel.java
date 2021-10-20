package fiap.com.br.SofiaBag.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Data
@Builder
@Component
@AllArgsConstructor
@NoArgsConstructor
public class LoginModel {

    private String email;

    private String password;

    public Authentication getAuthentication() {
        return new UsernamePasswordAuthenticationToken(this.email, this.password);
    }

}
