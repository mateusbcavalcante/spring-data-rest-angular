CREATE TABLE carro 
(
	id bigserial NOT NULL,  
	nome character varying(100) NOT NULL,
 	descricao text NOT NULL,
 	estado character varying(20) NOT NULL,
 	status character varying(20) NOT NULL,
 	vendido integer,
 	CONSTRAINT carro_pkey PRIMARY KEY (id)
);