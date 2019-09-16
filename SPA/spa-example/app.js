'use strict';

/**
 * Inspo: https://gist.github.com/prof3ssorSt3v3/f00d99fb69272fc2e0e4f4dd46e89f41
 */

const spa = {
  pageLinks: [],

  init: function() {
    this.pageLinks = document.querySelectorAll('.link-list__link');

    this.pageLinks.forEach((pageLink) => {
      pageLink.addEventListener('click', () => {
        event.preventDefault();

        const pageTarget = event.target.getAttribute('data-target');
        const activePage = event.target.closest('.page');
        let newPage;

        if (pageTarget == activePage.id) {
          return;
        }

        newPage = document.querySelectorAll(`#${pageTarget}`);
        activePage.classList.remove('page--active');
        newPage[0].classList.add('page--active');
        history.pushState({}, pageTarget, `#${pageTarget}`)
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', spa.init);
