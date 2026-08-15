--
-- PostgreSQL database dump
--


-- Dumped from database version 17.11
-- Dumped by pg_dump version 17.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: maquinas; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.maquinas (id, nome, modelo, url_imagem) VALUES (1, 'Pulverizador Costal Elétrico', 'SB', 'PREENCHER_LINK_OFICIAL');


--
-- Data for Name: pecas; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (1, '1220918', 'Tampa com Diafragma', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (2, '1168542', 'Diafragma da Tampa (Nitrílica)', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (3, '1220919', 'Coador', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (4, '1220618', 'Cinta Completa com Alça', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (5, '1220973', 'Fivela da Cinta', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (6, '1220619', 'Corpo do Depósito 20L', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (7, '1223765', 'Corpo do Depósito 16L', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (8, '1168397', 'Trava da Base', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (9, '1269105', 'Vedação da Base PJB', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (10, '1297142', 'Base do Pulverizador Elétrico SB', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (11, '1297143', 'Anel Protetor da Mangueira SB', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (12, '1265961', 'Bomba Elétrica', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (13, '1295630', 'Bateria Li-Ion JB-1680P', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (14, '1295629', 'Bateria Li-Ion JB-1640P', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (15, '1268711', 'Painel Completo com Potenciômetro', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (16, '1220622', 'Parafuso Flang. PH 5 x 12 mm', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (17, '1223781', 'Carregador com Plug Tipo C', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (18, '1220640', 'Tampa da Base', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (20, '1297316', 'Mangueira SB', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (21, '1220962', 'Cabo do Registro LP 601', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (22, '1220966', 'Pinça LP 601', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (23, '1220968', 'Corpo do Registro LP 601', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (24, '1217605', 'Registro Completo LP 601', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (25, '1220951', 'Alavanca do Registro LP 601', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (26, '996058', 'Tampa do Registro LP 601/605 com Vedação', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (27, '1230971', 'Agulha do Registro', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (19, '1220947', 'Parafuso Cabeça Panela Phillips M5 x 0,8 x 12 mm', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (28, '1220969', 'Porca Cônica 11/16', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (29, '635276', 'Junção e Junta Cônica', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (30, '100131', 'Tubo de Pulverização em Aço Inoxidável', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (31, '1168545', 'Filtro do Bico M50/60', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (32, '1168546', 'Capa do Bico', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (33, '1222664', 'Bico Cone Regulável Azul', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (34, '530626', 'Lança Completa', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (35, '1282460', 'Filtro de Sucção da Bomba PJM-25', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (36, '1220625', 'Kit de Mangueiras', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (37, '1223797', 'Carregador com Plug Tipo A', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (38, '1223793', 'Carregador com Plug Tipo F', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (39, '1245614', 'Carregador com Plug Tipo G', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');
INSERT INTO public.pecas (id, codigo_jacto, nome, url_pasta_fotos, url_compra, url_video, ativo, url_foto_principal) VALUES (40, '1255166', 'Carregador com Plug Tipo I', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', 'PREENCHER_LINK_OFICIAL', true, 'PREENCHER_LINK_OFICIAL');


--
-- Data for Name: historico_identificacoes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: avaliacoes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: observacoes_relacionamento; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (1, 1, 'Tampa aloja a diafragma de vedação e cobre o coador no bocal do tanque.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (2, 2, 'Diafragma nitrílica é o componente interno de vedação da Tampa; sempre trocados em conjunto.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (3, 3, 'Coador se encaixa no bocal do depósito, sob a tampa com diafragma.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (4, 4, 'Fivela é o componente de fixação/ajuste integrado à cinta.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (5, 5, 'Fivela só existe montada na cinta completa.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (6, 6, 'Tanque 20L é fechado pela Tampa com Diafragma e recebe o Coador no bocal.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (7, 7, 'Tanque 16L usa a mesma Tampa com Diafragma e o mesmo Coador do modelo 20L.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (8, 8, 'Trava, vedação, base e tampa da base formam o conjunto da base do pulverizador.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (9, 9, 'Vedação (retentor) veda a junção entre a Trava da Base e a Base do Pulverizador.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (10, 10, 'Base aloja a Bomba Elétrica e é fechada/travada pela Tampa da Base e Trava da Base.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (11, 11, 'Anel protege e veda a conexão da mangueira; também integra o Kit de Mangueiras.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (12, 12, 'Bomba é montada na Base do Pulverizador Elétrico SB e recebe o Filtro de Sucção em sua entrada.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (13, 13, 'Bateria alternativa de mesma linha; carregada pelo carregador padrão (Tipo C) ou pelos carregadores opcionais (Tipos A, F, G, I) conforme o país.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (14, 14, 'Bateria alternativa de mesma linha; carregada pelo carregador padrão (Tipo C) ou pelos carregadores opcionais (Tipos A, F, G, I) conforme o país.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (15, 15, 'Parafuso flange é o elemento de fixação do Painel Completo na estrutura.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (16, 16, 'Fixa exclusivamente o Painel Completo com Potenciômetro.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (17, 17, 'Carregador padrão (Tipo C) para as baterias JB-1680P/1640P; opções de plugue A/F/G/I são alternativas por país.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (18, 18, 'Tampa da Base é fixada na Base do Pulverizador com o parafuso item 17 e travada pela Trava da Base.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (19, 19, 'Parafuso de fixação exclusivo da Tampa da Base.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (20, 20, 'Mangueira é protegida/vedada pelo Anel Protetor e compõe o Kit de Mangueiras.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (21, 21, 'Cabo se encaixa no Corpo do Registro, preso pela Pinça; ambos compõem o Registro Completo.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (22, 22, 'Pinça fixa o Cabo ao Corpo do Registro; componente do Registro Completo LP 601.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (23, 23, 'Corpo do Registro é a peça central que recebe Cabo, Pinça, Alavanca, Tampa, Agulha, Junta e Porca Cônica.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (24, 24, 'Registro Completo LP 601 é o conjunto montado com todos os componentes 19-21/23-27; integra a Lança Completa junto com o Tubo.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (25, 25, 'Alavanca aciona a Agulha através do Corpo do Registro.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (26, 26, 'Tampa do Registro fecha o Corpo e retém a Agulha internamente.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (27, 27, 'Agulha do Registro trabalha dentro do Corpo, retida pela Tampa com Vedação.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (28, 28, 'Porca Cônica une a Junta Cônica ao Corpo do Registro e fixa o Bico na saída do registro.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (29, 29, 'Junta Cônica veda a união entre Corpo do Registro e Porca Cônica.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (30, 30, 'Tubo de pulverização se conecta ao Corpo do Registro e compõe a Lança Completa.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (31, 31, 'Filtro do Bico é interno à Capa do Bico, que retém o Bico Cone Regulável.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (32, 32, 'Capa do Bico aloja o Filtro e prende o Bico Cone Regulável na ponta da lança.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (33, 33, 'Bico Cone Regulável é preso pela Capa do Bico (com Filtro) e conectado via Porca Cônica.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (34, 34, 'Lança Completa integra Tubo + Registro (item 22) e, na ponta, Capa/Filtro/Bico.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (35, 35, 'Filtro de Sucção é acoplado diretamente à entrada de sucção da Bomba Elétrica.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (36, 36, 'Kit de Mangueiras é composto pela Mangueira SB e seu Anel Protetor.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (37, 37, 'Carregador opcional (plugue tipo A) — alternativa de plugue para as mesmas baterias; intercambiável com os demais tipos de plugue.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (38, 38, 'Carregador opcional (plugue tipo F) — alternativa de plugue para as mesmas baterias; intercambiável com os demais tipos de plugue.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (39, 39, 'Carregador opcional (plugue tipo G) — alternativa de plugue para as mesmas baterias; intercambiável com os demais tipos de plugue.');
INSERT INTO public.observacoes_relacionamento (id, peca_id, observacao) VALUES (40, 40, 'Carregador opcional (plugue tipo I) — alternativa de plugue para as mesmas baterias; intercambiável com os demais tipos de plugue.');


--
-- Data for Name: peca_relacionada; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (3, 1, 2);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (4, 1, 3);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (5, 2, 1);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (6, 3, 1);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (7, 3, 6);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (8, 3, 7);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (9, 4, 5);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (10, 5, 4);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (11, 6, 1);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (12, 6, 3);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (13, 7, 1);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (14, 7, 3);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (15, 8, 9);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (16, 8, 10);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (17, 8, 18);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (18, 9, 8);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (19, 9, 10);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (20, 10, 8);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (21, 10, 9);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (22, 10, 12);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (23, 10, 18);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (24, 11, 20);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (25, 11, 36);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (26, 12, 10);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (27, 12, 35);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (28, 13, 14);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (29, 13, 17);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (30, 13, 37);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (31, 13, 38);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (32, 13, 39);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (33, 13, 40);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (34, 14, 13);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (35, 14, 17);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (36, 14, 37);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (37, 14, 38);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (38, 14, 39);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (39, 14, 40);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (40, 15, 16);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (41, 16, 15);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (42, 17, 13);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (43, 17, 14);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (44, 17, 37);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (45, 17, 38);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (46, 17, 39);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (47, 17, 40);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (48, 18, 10);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (49, 18, 19);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (50, 18, 8);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (51, 19, 18);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (52, 20, 11);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (53, 20, 36);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (54, 21, 22);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (55, 21, 23);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (56, 21, 24);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (57, 22, 21);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (58, 22, 23);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (59, 22, 24);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (60, 23, 21);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (61, 23, 22);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (62, 23, 25);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (63, 23, 26);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (64, 23, 27);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (65, 23, 28);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (66, 23, 29);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (67, 23, 24);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (68, 24, 21);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (69, 24, 22);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (70, 24, 23);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (71, 24, 25);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (72, 24, 26);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (73, 24, 27);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (74, 24, 28);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (75, 24, 29);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (76, 24, 30);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (77, 24, 34);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (78, 25, 23);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (79, 25, 24);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (80, 26, 23);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (81, 26, 27);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (82, 26, 24);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (83, 27, 23);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (84, 27, 26);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (85, 27, 24);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (86, 28, 23);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (87, 28, 29);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (88, 28, 24);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (89, 28, 33);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (90, 29, 23);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (91, 29, 28);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (92, 29, 24);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (93, 30, 34);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (94, 30, 23);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (95, 31, 32);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (96, 31, 33);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (97, 32, 31);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (98, 32, 33);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (99, 33, 31);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (100, 33, 32);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (101, 33, 28);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (102, 34, 30);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (103, 34, 24);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (104, 34, 33);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (105, 34, 31);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (106, 34, 32);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (107, 35, 12);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (108, 36, 20);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (109, 36, 11);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (110, 37, 13);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (111, 37, 14);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (112, 37, 17);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (113, 37, 38);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (114, 37, 39);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (115, 37, 40);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (116, 38, 13);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (117, 38, 14);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (118, 38, 17);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (119, 38, 37);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (120, 38, 39);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (121, 38, 40);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (122, 39, 13);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (123, 39, 14);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (124, 39, 17);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (125, 39, 37);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (126, 39, 38);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (127, 39, 40);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (128, 40, 13);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (129, 40, 14);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (130, 40, 17);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (131, 40, 37);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (132, 40, 38);
INSERT INTO public.peca_relacionada (id, peca_id, peca_relacionada_id) VALUES (133, 40, 39);


--
-- Name: avaliacoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.avaliacoes_id_seq', 1, false);


--
-- Name: historico_identificacoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.historico_identificacoes_id_seq', 1, false);


--
-- Name: maquinas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.maquinas_id_seq', 1, true);


--
-- Name: observacoes_relacionamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.observacoes_relacionamento_id_seq', 40, true);


--
-- Name: peca_relacionada_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.peca_relacionada_id_seq', 133, true);


--
-- Name: pecas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pecas_id_seq', 40, true);


