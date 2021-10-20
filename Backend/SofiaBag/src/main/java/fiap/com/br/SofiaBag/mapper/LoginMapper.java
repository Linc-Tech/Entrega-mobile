package fiap.com.br.SofiaBag.mapper;

import fiap.com.br.SofiaBag.dto.request.LoginDTO;
import fiap.com.br.SofiaBag.dto.response.UserResponseDTO;
import fiap.com.br.SofiaBag.model.LoginModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface LoginMapper {

    LoginMapper INSTANCE = Mappers.getMapper(LoginMapper.class);

    LoginModel toModel(LoginDTO loginDTO);

    LoginDTO toDTO(LoginModel login);
}
