

// let likeButton = document.querySelector('ytd-toggle-button-renderer.ytd-menu-renderer:nth-child(1) > a:nth-child(1) > yt-icon-button:nth-child(1) > button:nth-child(1)');
// console.log('arutintd', likeButton);
// while(likeButton === null) {
//   likeButton = document.querySelector('ytd-toggle-button-renderer.ytd-menu-renderer:nth-child(1) > a:nth-child(1) > yt-icon-button:nth-child(1) > button:nth-child(1)');
//   likeButton.addEventListener('click', () => {
//     alert('test');
//   });
// }
// console.log('arutintd', likeButton);

const observer = new MutationObserver((mutations, obs) => {
  const likeButton = document.querySelector('ytd-toggle-button-renderer.force-icon-button:nth-child(1) > a:nth-child(1)');
  if (likeButton) {
    likeButton.getBoundingClientRect();
    likeButton.addEventListener('click', () => {
      const xhttp = new XMLHttpRequest();
      xhttp.send('GET', 'https://bad-pixel.gillespie.eu/test/likes')
    });
    obs.disconnect();
    return;
  }
});

observer.observe(document, {
  childList: true,
  subtree: true
});
