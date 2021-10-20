package fiap.com.br.SofiaBag.entity;

import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;

import lombok.Data;

@Data
@Entity
public class Role implements GrantedAuthority {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "id_Sequence")
    @SequenceGenerator(name = "id_Sequence", sequenceName = "ID_SEQ")
    private Long id;
    private String name; //ROLE_ADMIN ou ROLE_USER

    @Override
    public String getAuthority() {
        return this.name;
    }

}
