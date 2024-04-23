create table CAR(
                    ID INT not null AUTO_INCREMENT,
                    MAKE varchar(100) not null,
                    MODEL varchar(100) not null,
                    PRODUCTION_YEAR int not null ,
                    PRIMARY KEY (ID)
);
insert into CAR (MAKE, MODEL, PRODUCTION_YEAR) values ('Mazda','RX7', 1996);
insert into CAR (MAKE, MODEL, PRODUCTION_YEAR) values ('Nissan','Skyline GT-R', 1999);
