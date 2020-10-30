(function() {
    setTimeout(init);
    function init() {
        var scrollElemToWatch_1 = document.getElementById('block_reveal'),
            rev1 = new RevealFx(scrollElemToWatch_1, {
                revealSettings : {
                    bgcolor: '#000',
                    delay: 0,
                    duration: 400,
                    onStart: function(contentEl, revealerEl) {
                        anime.remove(contentEl);
                        contentEl.style.opacity = 0;
                    },
                    onCover: function(contentEl, revealerEl) {
                        contentEl.style.opacity = 1;
                        anime({
                            targets: contentEl,
                            easing: 'easeOutExpo',
                        });
                    }
                }
            })
        rev1.reveal();
    }
})();