-- DANGER: this is NOT how to do it in the real world.
-- You should NEVER EVER check user data into Git!

-- SAMPLE USER1
insert into "users" ("userId", "username", "profilePhotoUrl", "hashedPassword", "followerCount", "followingCount", "postCount")
     values (100, 'sushi_lover', 'image-1650864757312.jpeg', 'pass1', 2, 1, 3);

insert into "posts" ("userId", "postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (100, 100, 'Celebrated my birthday with delicious sushi!', 'image-1650860094759.jpeg', 'San Francisco, CA', true, '2022-03-21 11:30:10');

insert into "posts" ("userId", "postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (100, 101, 'This is great.', 'image-1650862677041.JPG', 'Irvine, CA', true, '2022-04-21 12:30:10');

insert into "posts" ("userId", "postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (100, 102, 'MOAR Sushi haha.', 'image-1650861360080.jpeg', 'Concord, CA', true, '2022-04-23 14:30:10');


-- SAMPLE USER2
insert into "users" ("userId", "username",  "profilePhotoUrl", "hashedPassword", "followerCount", "followingCount", "postCount")
     values (101, 'casual_cook', 'image-1650864705652.jpeg', 'pass2', 2, 2, 3);

insert into "posts" ("userId","postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (101, 107, 'First post! Upgraded ramen noodles.', 'image-1650859980943.jpeg', 'Vallejo, CA', false, '2022-04-17 18:30:10');

insert into "posts" ("userId","postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (101, 108, 'Made some fish and chips with some sides.', 'image-1650861154878.jpeg', 'Vallejo, CA', false, '2022-04-19 18:30:10');

-- SAMPLE USER3
insert into "users" ("userId", "username", "profilePhotoUrl", "hashedPassword", "followerCount", "followingCount", "postCount")
     values (102, 'varietyEater', 'image-1650869307167.jpeg', 'pass1', 2, 1, 2);

insert into "posts" ("userId","postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (102, 110, 'Perfect for a cold day!', 'image-1650862870268.jpeg', 'Irvine, CA', true, '2022-04-22 15:30:10');

insert into "posts" ("userId","postId", "caption", "imageUrl", "location", "isBought", "createdAt")
     values (102, 111, 'Just get mild.', 'image-1650863415145.jpeg', 'Irvine, CA', true, '2022-04-23 15:30:10');

insert into "comments" ("userId", "comment", "postId")
     values (101, 'WOW', 100);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'It looks amazing!', 100);

insert into "comments" ("userId", "comment", "postId")
     values (101, 'That looks so good! Where did you get this?', 101);
