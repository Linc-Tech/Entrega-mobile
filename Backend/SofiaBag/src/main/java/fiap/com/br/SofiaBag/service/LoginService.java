package fiap.com.br.SofiaBag.service;

import fiap.com.br.SofiaBag.dto.request.LoginDTO;
import fiap.com.br.SofiaBag.dto.response.UserResponseDTO;
import fiap.com.br.SofiaBag.entity.User;
import fiap.com.br.SofiaBag.exception.UserNotFoundException;
import fiap.com.br.SofiaBag.mapper.LoginMapper;
import fiap.com.br.SofiaBag.mapper.UserMapper;
import fiap.com.br.SofiaBag.model.LoginModel;
import fiap.com.br.SofiaBag.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class LoginService {

    private UserRepository userRepository;

    private AuthenticationManager authenticationManager;

    private TokenService tokenService;

    private final LoginMapper loginMapper = LoginMapper.INSTANCE;

    public ResponseEntity<UserResponseDTO> singIn(LoginDTO loginDTO) throws UserNotFoundException, AuthenticationException {
        LoginModel loginToValidate = loginMapper.toModel(loginDTO);
        String email = loginToValidate.getEmail();
        String password = loginToValidate.getPassword();

        Authentication auth = getAuthentication(email, password);

        Authentication authentication = authenticationManager.authenticate(auth);

        String token = tokenService.createToken(authentication);

        User user = userRepository.findUserByEmail(email).get();

        UserResponseDTO userResponseDTO = new UserResponseDTO(
                user.getId(), user.getName(), user.getNickname(), user.getEmail(), token
            );

        return ResponseEntity.ok(userResponseDTO);

    }

    public Authentication getAuthentication(String email, String password) {
        return new UsernamePasswordAuthenticationToken(email, password);
    }

}
