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
let isActive = false;


const searchFilter = document.querySelector('#search');

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
  userInfo.textContent = type + '  ' + '  •  ' + followersAmount + '    ' + "Followers" + '   ' + '  •  ' + postsAmount + '      ' + 'Posts';
  return userInfo;
}
const createUserCard = (communities, i, arr) => {
  const userCard = document.createElement('div');
  userCard.className = 'userCard';
  userCard.append(getUserPicture(communities.image), getUserContent(communities.name, communities.type, communities.followersAmount, communities.postsAmount), createButton(i, arr));
  return userCard;
}
const getUserContent = (name, type, followersAmount, postsAmount) => {
  const userContent = document.createElement('div');
  userContent.className = "userContent";
  userContent.append(getUserName(name), getUserInfo(type, followersAmount, postsAmount));
  return userContent
}
const createButton = (i, arr) => {
  if (!isActive) {
    return createFollowBtn(i, arr)

  }
  else {
    return createDropBtn(i, arr)
  }
}
const createFollowBtn = (i, arr) => {
  const followButton = document.createElement('button');
  followButton.className = 'followButton';
  followButton.addEventListener('click', (e) => {
    if (e.target.innerHTML === 'Follow') {
      e.target.innerHTML = 'Unfollow'
      followButton.classList.remove('followButton')
      followButton.classList.add('unfollowButton')
      arr[i].isFollow = true;
      // console.log(arr[i].isFollow)

    }
    else {
      e.target.innerHTML = 'Follow'
      followButton.className = 'followButton'
      arr[i].isFollow = false;
    }
    console.log('communities', communities)

  }

  )
  if (arr[i].isFollow) {
    followButton.innerHTML = 'Unfollow'
    followButton.className = "unfollowButton"
  }
  else {
    followButton.innerHTML = "Follow"
  }
  // console.log(followButton)
  return followButton
}
// 

const createDropBtn = (i, arr) => {
  const dropbtn = document.createElement('button');
  dropbtn.className = 'dropbtn';
  dropbtn.innerHTML = '• • •';
  dropbtn.addEventListener('click', (e) => {
    console.log(e.target.parentElement, 123);

    if (e.target.classList.contains("dropbtn")) {

      if (dropbtn.childNodes.length === 1) {
        const dropContent = document.createElement('button');
        dropContent.innerHTML = 'Unfollow';

        dropContent.className = 'dropContent';
        dropContent.onblur = () => {
          dropbtn.innerHTML = '• • •';
        }
        dropbtn.append(dropContent)
        dropContent.focus();
      }

      else {
        dropbtn.textContent = '• • •';
      }
    }

    if (e.target.classList.contains("dropContent")) {
      arr[i].isFollow = false;
      e.target.parentElement.parentElement.classList.toggle('userCard');
      e.target.parentElement.parentElement.innerHTML = '';


    }
  })


  return dropbtn;
}

for (let i = 0; i < communities.length; i++) {
  userContainer.append(createUserCard(communities[i], i, communities));
}

const comms = document.querySelector('.myComms');
comms.addEventListener('click', () => {
  
  discover.classList.remove('active')
  comms.classList.add('active')
  isActive = true;
  console.log(isActive)
  const followList = communities.filter((item) => item.isFollow);
  userContainer.innerHTML = '';
  for (let i = 0; i < followList.length; i++) {
    userContainer.append(createUserCard(followList[i], i, followList))
  }
})

const discover = document.querySelector('.discover');
discover.classList.add('active')
discover.addEventListener('click', () => {
  searchFilter.innerHTML = '';
  
  comms.classList.remove('active');
  discover.classList.add('active');
  isActive = false;
  console.log(isActive)
  userContainer.innerHTML = '';
  for (let i = 0; i < communities.length; i++) {
    userContainer.append(createUserCard(communities[i], i, communities));
  }
  console.log(searchFilter.value);
})


searchFilter.addEventListener('input', (event) => {
  if (!isActive) {
    const filtered = communities.filter(function (user) {
      return user.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    userContainer.innerHTML = '';
    for (let i = 0; i < filtered.length; i++) {
      userContainer.append(createUserCard(filtered[i], i, filtered))
    }
  }
  else {
    const followList = communities.filter(item => item.isFollow);
    const filtered = followList.filter(user => {
      return user.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    userContainer.innerHTML = '';
    for (let i = 0; i < filtered.length; i++) {
      userContainer.append(createUserCard(filtered[i], i, filtered))
    }
  }
  console.log(searchFilter.value);

})