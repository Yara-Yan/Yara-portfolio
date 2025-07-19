
/*!
    Title: Dev Portfolio Template
    Version: 1.2.2
    Last Change: 03/25/2020
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Show current year
    $("#current-year").text(new Date().getFullYear());

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

})(jQuery);

// Certificate Carousel Functionality
let currentSlideIndex = 0;
let slides = [];
let dots = [];
let autoAdvanceInterval;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // Update dots - re-select to ensure we have current references
    const currentDots = document.querySelectorAll('.dot');
    if (currentDots[index]) {
        currentDots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    // Loop back to first slide if at the end
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    // Loop to last slide if at the beginning
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    
    // Ensure dots are updated after a brief delay
    setTimeout(() => {
        const currentDots = document.querySelectorAll('.dot');
        currentDots.forEach((dot, i) => {
            if (i === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }, 10);
}

// Initialize carousel - try multiple approaches
function initCarousel() {
    // Get carousel elements
    slides = document.querySelectorAll('.carousel-slide');
    dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) {
        setTimeout(initCarousel, 100);
        return;
    }
    
    // Add event listeners to buttons
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (prevBtn) {
        // Remove any existing listeners
        prevBtn.replaceWith(prevBtn.cloneNode(true));
        const newPrevBtn = document.querySelector('.carousel-btn.prev');
        if (newPrevBtn) {
            newPrevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                changeSlide(-1);
            });
        }
    }
    
    if (nextBtn) {
        // Remove any existing listeners
        nextBtn.replaceWith(nextBtn.cloneNode(true));
        const newNextBtn = document.querySelector('.carousel-btn.next');
        if (newNextBtn) {
            newNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                changeSlide(1);
            });
        }
    }
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
        // Remove any existing listeners
        dot.replaceWith(dot.cloneNode(true));
        const newDot = document.querySelectorAll('.dot')[index];
        newDot.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentSlide(index + 1);
        });
    });
    
    // Re-select dots after cloning to ensure we have the correct references
    dots = document.querySelectorAll('.dot');
    
    // Initialize first slide
    if (slides.length > 0) {
        showSlide(0);
    }
    
    // Auto-advance carousel every 5 seconds
    if (slides.length > 1) {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
        autoAdvanceInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }
}

// Try multiple initialization approaches
document.addEventListener('DOMContentLoaded', initCarousel);
window.addEventListener('load', initCarousel);

// Also try immediate initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}
