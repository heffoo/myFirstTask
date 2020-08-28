import faker from 'faker'

let communities = []
for (let i = 0; i < 6; i++) {
  communities.push({
    id: faker.random.uuid(),
    image: faker.image.avatar(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    type: 'Game',
    followersAmount: faker.random.number(),
    postsAmount: faker.random.number(),
    isFollow: false,
  })
}
// let form = doument.createElement('div');
// form.className = "form";
// document.body.prepend(form);
// let userCard = document.createElement('div');
// userCard.className = "userCard";

const userContainer = document.querySelector('.user_container');
const getUserPicture = (image) => {
  const userPicture = document.createElement('div');
  userPicture.className = 'userPicture';
  const img = document.createElement('img'); //<img></img>
  img.src = image;
  img.className = 'image';
  userPicture.append(img);
  return userPicture;
}
const getUserName = (name) => {
  const userName = document.createElement('div');
  userName.className = 'userName';
  userName.textContent = name;
  return userName;
}
const getUserInfo = (type, followersAmount, postsAmount) => {
  const userInfo = document.createElement('div');
  userInfo.className = 'userInfo';
  userInfo.textContent = type + '  ' + followersAmount + '    ' + "Followers" + '   ' + postsAmount + '      ' + 'Posts';
  return userInfo;
}
const createUserCard = (communities, i) => {
  const userCard = document.createElement('div');
  userCard.className = 'userCard';
  userCard.append(getUserPicture(communities.image), getUserContent(communities.name, communities.type, communities.followersAmount, communities.postsAmount), createButton(i));
  return userCard;
}
const getUserContent = (name, type, followersAmount, postsAmount) => {
  const userContent = document.createElement('div');
  userContent.className = "userContent";
  userContent.append(getUserName(name), getUserInfo(type, followersAmount, postsAmount));
  return userContent
}
const createButton = (i) => {
  const followButton = document.createElement('button');
  followButton.className = 'followButton';
  followButton.addEventListener('click', (e) => {
    if (e.target.innerHTML === 'Follow') {
      e.target.innerHTML = 'Unfollow'
      followButton.classList.remove('followButton')
      followButton.classList.add('unfollowButton')
      communities[i].isFollow = true;
      console.log(communities[i].isFollow)

    }
    else {
      e.target.innerHTML = 'Follow'
      followButton.className = 'followButton'
      communities[i].isFollow = false;
      console.log(communities[i].isFollow)
    }
  }
  )
  followButton.innerHTML = 'Follow';
  console.log(followButton)
  return followButton
}

for (let i = 0; i <= communities.length; i++) {
  userContainer.append(createUserCard(communities[i], i));
}
