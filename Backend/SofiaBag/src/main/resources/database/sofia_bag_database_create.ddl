CREATE TABLE etiqueta (
    cod_rfid          VARCHAR2(30) NOT NULL,
    objeto_id_objeto  VARCHAR2(30) NOT NULL,
    objeto_id_usuario VARCHAR2(30) NOT NULL
);

CREATE UNIQUE INDEX etiqueta__idx ON
    etiqueta (
        objeto_id_objeto
    ASC,
        objeto_id_usuario
    ASC );

ALTER TABLE etiqueta ADD CONSTRAINT etiqueta_pk PRIMARY KEY ( cod_rfid );

CREATE TABLE objeto (
    id_objeto          VARCHAR2(30) NOT NULL,
    nm_objeto          VARCHAR2(60) NOT NULL,
    cat_objeto         VARCHAR2(20) NOT NULL,
    hr_lembrete        DATE NOT NULL,
    usuario_id_usuario VARCHAR2(30) NOT NULL
);

ALTER TABLE objeto ADD CONSTRAINT objeto_pk PRIMARY KEY ( id_objeto,
                                                          usuario_id_usuario );

CREATE TABLE usuario (
    id_usuario      VARCHAR2(30) NOT NULL,
    nm_usuario      VARCHAR2(80) NOT NULL,
    apelido_usuario VARCHAR2(30) NOT NULL,
    email_usuario   VARCHAR2(80) NOT NULL,
    senha_usuario   VARCHAR2(60) NOT NULL
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( id_usuario );

ALTER TABLE etiqueta
    ADD CONSTRAINT rel_objeto_etiqueta FOREIGN KEY ( objeto_id_objeto,
                                                     objeto_id_usuario )
        REFERENCES objeto ( id_objeto,
                            usuario_id_usuario );

ALTER TABLE objeto
    ADD CONSTRAINT rel_usuario_objeto FOREIGN KEY ( usuario_id_usuario )
        REFERENCES usuario ( id_usuario );
