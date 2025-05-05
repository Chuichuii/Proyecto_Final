--  Creado con Kata Kuntur - Modelador de Datos
--  Versión: 2.5.4
--  Sitio Web: http://katakuntur.jeanmazuelos.com/
--  Si usted encuentra algún error le agradeceriamos lo reporte en:
--  http://pm.jeanmazuelos.com/katakuntur/issues/new

--  Administrador de Base de Datos: Microsoft SQLServer
--  Diagrama: Robert
--  Autor: Robert
--  Fecha y hora: 05/05/2025 13:40:14

-- GENERANDO TABLAS
CREATE TABLE [Cliente] (
	[Id] INT IDENTITY NOT NULL,
	[Nombre] varcHAR(50) NOT NULL,
	[dni] varcHAR(20) NOT NULL,
	[Correo] varcHAR(250) NOT NULL,
	[Telefono] varcHAR(15) NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Empleados] (
	[Id] INT IDENTITY NOT NULL,
	[Nombre] varcHAR(50) NOT NULL,
	[Correo] varcHAR(150) NOT NULL,
	[Telefono] varcHAR(15) NOT NULL,
	[Puesto_Id] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Destino] (
	[Id] INT IDENTITY NOT NULL,
	[Pais] varcHAR(50) NOT NULL,
	[Ciudad] varcHAR(50) NOT NULL,
	[Descripcion] varcHAR(250) NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Paquetes_Turisticos] (
	[Id] INT IDENTITY NOT NULL,
	[Nombre] varcHAR(50) NOT NULL,
	[Descripcion] varcHAR(250) NOT NULL,
	[Precio] DECIMAL NOT NULL,
	[Duracion] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Reservas] (
	[Id] INT IDENTITY NOT NULL,
	[Fecha] DATE NOT NULL,
	[Total] DECIMAL NOT NULL,
	[Cliente_Id] INT NOT NULL,
	[Paquetes_Turisticos_Id] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Puesto] (
	[Id] INT IDENTITY NOT NULL,
	[Nombre] varchar(50) NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Itinerarios] (
	[Id] INT IDENTITY NOT NULL,
	[Fecha_Llegada] DATE NOT NULL,
	[Fecha_Salida] DATE NOT NULL,
	[Origen] varcHAR(50) NOT NULL,
	[Destino] varcHAR(100) NOT NULL,
	[Paquetes_Turisticos_Id] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Hotel] (
	[Id] INT IDENTITY NOT NULL,
	[Nombre] varcHAR(100) NOT NULL,
	[Direccion] varcHAR(150) NOT NULL,
	[Estrella] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Pagos] (
	[Id] INT IDENTITY NOT NULL,
	[Monto] DECIMAL NOT NULL,
	[Fecha] DATE NOT NULL,
	[Metodo_Pago_Id] INT NOT NULL,
	[Reservas_Id] INT NOT NULL,
	[Empleados_Id] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Metodo_Pago] (
	[Id] INT IDENTITY NOT NULL,
	[Nombre] varcHAR(50) NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Opiniones] (
	[Id] INT IDENTITY NOT NULL,
	[Comentario] varcHAR(250) NOT NULL,
	[Puntuacion] INT NOT NULL,
	[Fecha] DATE NOT NULL,
	[Cliente_Id] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Promociones] (
	[Id] INT IDENTITY NOT NULL,
	[Descripcion] varcHAR(250) NOT NULL,
	[Descuento] DECIMAL NOT NULL,
	[Fecha_Inicio] DATE NOT NULL,
	[Fecha_Fin] DATE NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Incidentes] (
	[Id] INT IDENTITY NOT NULL,
	[Descripcion] varcHAR(250) NOT NULL,
	[Fecha] DATE NOT NULL,
	[Estado] varcHAR(50) NOT NULL,
	[Reservas_Id] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Encuesta_Satisfaccin] (
	[Id] INT IDENTITY NOT NULL,
	[Calificacion] INT NOT NULL,
	[Comentarios] varcHAR(250) NOT NULL,
	[Reservas_Id] INT NOT NULL,
	[Cliente_Id] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [Guia] (
	[Id] INT IDENTITY NOT NULL,
	[Nombre] varcHAR(50) NOT NULL,
	[Idiomas] varcHAR(50) NOT NULL,
	[Telefono] varcHAR(15) NOT NULL,
	[Correo] varcHAR(150) NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [PaquetesVSDestinos] (
	[Paquetes_Turisticos_Id] INT NOT NULL,
	[Destino_Id] INT NOT NULL
);
CREATE TABLE [Transportes] (
	[Id] INT IDENTITY NOT NULL,
	[Tipo] varcHAR(100) NOT NULL,
	[Empresa] varchAR(250) NOT NULL,
	[Capacidad] INT NOT NULL,
	PRIMARY KEY([Id])
);
CREATE TABLE [TransporteVSPaquete] (
	[Transportes_Id] INT NOT NULL,
	[Paquetes_Turisticos_Id] INT NOT NULL
);
CREATE TABLE [PaqueteVSHotel] (
	[Paquetes_Turisticos_Id] INT NOT NULL,
	[Hotel_Id] INT NOT NULL
);
CREATE TABLE [Guia_paquete] (
	[Guia_Id] INT NOT NULL,
	[Paquetes_Turisticos_Id] INT NOT NULL
);
CREATE TABLE [Paquete_Promocion] (
	[Promociones_Id] INT NOT NULL,
	[Paquetes_Turisticos_Id] INT NOT NULL
);

-- GENERANDO RELACIONES
ALTER TABLE [Empleados] ADD CONSTRAINT [empleados_puesto_puesto_id] FOREIGN KEY ([Puesto_Id]) REFERENCES [Puesto]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Reservas] ADD CONSTRAINT [reservas_cliente_cliente_id] FOREIGN KEY ([Cliente_Id]) REFERENCES [Cliente]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Reservas] ADD CONSTRAINT [reservas_paquetes_turisticos_paquetes_turisticos_id] FOREIGN KEY ([Paquetes_Turisticos_Id]) REFERENCES [Paquetes_Turisticos]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Itinerarios] ADD CONSTRAINT [itinerarios_paquetes_turisticos_paquetes_turisticos_id] FOREIGN KEY ([Paquetes_Turisticos_Id]) REFERENCES [Paquetes_Turisticos]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Pagos] ADD CONSTRAINT [pagos_metodo_pago_metodo_pago_id] FOREIGN KEY ([Metodo_Pago_Id]) REFERENCES [Metodo_Pago]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Pagos] ADD CONSTRAINT [pagos_reservas_reservas_id] FOREIGN KEY ([Reservas_Id]) REFERENCES [Reservas]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Pagos] ADD CONSTRAINT [pagos_empleados_empleados_id] FOREIGN KEY ([Empleados_Id]) REFERENCES [Empleados]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Opiniones] ADD CONSTRAINT [opiniones_cliente_cliente_id] FOREIGN KEY ([Cliente_Id]) REFERENCES [Cliente]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Incidentes] ADD CONSTRAINT [incidentes_reservas_reservas_id] FOREIGN KEY ([Reservas_Id]) REFERENCES [Reservas]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Encuesta_Satisfaccin] ADD CONSTRAINT [encuesta_satisfaccin_reservas_reservas_id] FOREIGN KEY ([Reservas_Id]) REFERENCES [Reservas]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Encuesta_Satisfaccin] ADD CONSTRAINT [encuesta_satisfaccin_cliente_cliente_id] FOREIGN KEY ([Cliente_Id]) REFERENCES [Cliente]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [PaquetesVSDestinos] ADD CONSTRAINT [paquetesvsdestinos_paquetes_turisticos_paquetes_turisticos_id] FOREIGN KEY ([Paquetes_Turisticos_Id]) REFERENCES [Paquetes_Turisticos]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [PaquetesVSDestinos] ADD CONSTRAINT [paquetesvsdestinos_destino_destino_id] FOREIGN KEY ([Destino_Id]) REFERENCES [Destino]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [TransporteVSPaquete] ADD CONSTRAINT [transportevspaquete_transportes_transportes_id] FOREIGN KEY ([Transportes_Id]) REFERENCES [Transportes]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [TransporteVSPaquete] ADD CONSTRAINT [transportevspaquete_paquetes_turisticos_paquetes_turisticos_id] FOREIGN KEY ([Paquetes_Turisticos_Id]) REFERENCES [Paquetes_Turisticos]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [PaqueteVSHotel] ADD CONSTRAINT [paquetevshotel_paquetes_turisticos_paquetes_turisticos_id] FOREIGN KEY ([Paquetes_Turisticos_Id]) REFERENCES [Paquetes_Turisticos]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [PaqueteVSHotel] ADD CONSTRAINT [paquetevshotel_hotel_hotel_id] FOREIGN KEY ([Hotel_Id]) REFERENCES [Hotel]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Guia_paquete] ADD CONSTRAINT [guia_paquete_guia_guia_id] FOREIGN KEY ([Guia_Id]) REFERENCES [Guia]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Guia_paquete] ADD CONSTRAINT [guia_paquete_paquetes_turisticos_paquetes_turisticos_id] FOREIGN KEY ([Paquetes_Turisticos_Id]) REFERENCES [Paquetes_Turisticos]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Paquete_Promocion] ADD CONSTRAINT [paquete_promocion_promociones_promociones_id] FOREIGN KEY ([Promociones_Id]) REFERENCES [Promociones]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE [Paquete_Promocion] ADD CONSTRAINT [paquete_promocion_paquetes_turisticos_paquetes_turisticos_id] FOREIGN KEY ([Paquetes_Turisticos_Id]) REFERENCES [Paquetes_Turisticos]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;