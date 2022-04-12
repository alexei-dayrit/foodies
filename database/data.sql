-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("username", "hashedPassword")
values ('anonymous1', 'placeholder')

insert into "users" ("username", "hashedPassword")
values ('anonymous2', 'placeholder')
