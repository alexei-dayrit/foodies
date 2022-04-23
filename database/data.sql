-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

insert into "users" ("userId", "username", "profilePhotoUrl", "hashedPassword")
     values (100, 'anonymous1', 'image-1649956734443.jpeg', 'pass1');

insert into "users" ("userId", "username",  "profilePhotoUrl", "hashedPassword")
     values (101, 'anonymous2', null, 'pass2');

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought")
     values (100, 'caption1', 'image-1649888023634.jpeg', 'location1', 100, true);

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought")
     values (101, 'caption2', 'image-1649888023634.jpeg', 'location2', 100, false);

insert into "posts" ("postId", "caption", "imageUrl", "location", "userId", "isBought")
     values (102, 'caption3', 'image-1649888023634.jpeg', 'location3', 101, false);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'WOW', 100);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'It looks amazing!', 100);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'That looks so good! Where did you get this?', 101);
-- 2022-04-12T18:44:59.581239Z
