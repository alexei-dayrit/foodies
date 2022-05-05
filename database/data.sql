-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

-- DEMO USER
insert into "users" ("userId", "username", "profilePhotoUrl", "hashedPassword")
     values (99, 'average_eater', '/images/image-1650997140946.jpeg', '$argon2i$v=19$m=4096,t=3,p=1$CJWaAzREBERoS/grWI0gdA$ApIMunxQ6q+nxQrJxUijMuMhiEKQCFU7eG/H2NzI21w');

insert into "posts" ("userId", "postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (99, 100, 'My first post, HOT POT!', '/images/image-1650863071591.jpeg', 'Boiling Point - Irvine, CA', true, '2022-04-28 11:30:10');

-- SAMPLE USER1
insert into "users" ("userId", "username", "profilePhotoUrl", "hashedPassword")
     values (100, 'sushi_lover', '/images/image-1650864757312.jpeg', 'pass1');

insert into "posts" ("userId", "postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (100, 101, 'Celebrated my birthday with delicious sushi!', '/images/image-1650860094759.jpeg', 'Sushi Bear - Tustin, CA', true, '2022-03-21 11:30:10');

insert into "posts" ("userId", "postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (100, 102, 'This is great.', '/images/image-1650862677041.JPG', 'Sanraku - San Francisco, CA', true, '2022-04-21 12:30:10');

insert into "posts" ("userId", "postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (100, 103, 'MOAR Sushi haha.', '/images/image-1650861360080.jpeg', 'Momoyama - Concord, CA', true, '2022-04-23 14:30:10');


-- SAMPLE USER2
insert into "users" ("userId", "username",  "profilePhotoUrl", "hashedPassword")
     values (101, 'casual_cook', '/images/image-1650864705652.jpeg', 'pass2');

insert into "posts" ("userId","postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (101, 104, 'First post! Upgraded ramen noodles.', '/images/image-1650859980943.jpeg', 'Vallejo, CA', false, '2022-04-17 18:30:10');

insert into "posts" ("userId","postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (101, 105, 'Made some fish and chips with some sides.', '/images/image-1650861154878.jpeg', 'Vallejo, CA', false, '2022-04-19 18:30:10');

-- SAMPLE USER3
insert into "users" ("userId", "username", "profilePhotoUrl", "hashedPassword")
     values (102, 'varietyEater', '/images/image-1650869307167.jpeg', 'pass3');

insert into "posts" ("userId","postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (102, 106, 'Perfect for a cold day!', '/images/image-1650862870268.jpeg', 'Ajisen Ramen - Irvine, CA', true, '2022-04-22 15:30:10');

insert into "posts" ("userId","postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (102, 107, 'Just get mild.', '/images/image-1650863415145.jpeg', 'Yup Dduk - Irvine, CA', true, '2022-04-23 15:30:10');

-- SAMPLE COMMENTS
insert into "comments" ("userId", "comment", "postId")
     values (100, 'Looks delicious!', 100);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'WOW', 100);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'It looks amazing!', 100);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'That looks so good! Where did you get this?', 101);

-- SAMPLE LIKES
insert into "likes" ("userId", "postId")
     values (99, 107);

insert into "likes" ("userId", "postId")
     values (100, 100);

insert into "likes" ("userId", "postId")
     values (100, 101);

insert into "likes" ("userId", "postId")
     values (100, 102);

insert into "likes" ("userId", "postId")
     values (100, 103);

insert into "likes" ("userId", "postId")
     values (100, 104);

insert into "likes" ("userId", "postId")
     values (100, 105);

insert into "likes" ("userId", "postId")
     values (100, 107);

-- SAMPLE FOLLOWS
insert into "followers" ("userId", "followerId")
     values (99, 100);

insert into "followers" ("userId", "followerId")
     values (99, 101);

insert into "followers" ("userId", "followerId")
     values (99, 102);

insert into "followers" ("userId", "followerId")
     values (100, 101);

insert into "followers" ("userId", "followerId")
     values (100, 102);

insert into "followers" ("userId", "followerId")
     values (101, 100);

insert into "followers" ("userId", "followerId")
     values (102, 100);
