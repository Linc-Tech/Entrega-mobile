package fiap.com.br.SofiaBag.controller;

import fiap.com.br.SofiaBag.dto.request.LoginDTO;
import fiap.com.br.SofiaBag.dto.response.UserResponseDTO;
import fiap.com.br.SofiaBag.service.LoginService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/login")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class LoginController {

    private LoginService loginService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponseDTO> signIn(@RequestBody @Valid LoginDTO loginDTO) {
        return loginService.singIn(loginDTO);
    }

}
