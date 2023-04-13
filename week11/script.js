/* 
inspired by this fireship video on animation on a scroll, 
but making scroll elements static and replaced full page divs
instead of physically scrolling down and introducing elements 
that way. 
https://www.youtube.com/watch?v=T33NN_pPeNI 
*/

document.addEventListener('DOMContentLoaded', function () { 
// page load before running script
    let currentIndex = 0;
    // prevents multiple scrolls at once
    let isAnimating = false; 
    let isScrolling = false;
    let accumulatedDeltaY = 0; 
    // totals the amt of scrolling for + or - depending on direction
    const scrollThreshold = 20; 
    // amount of scrolling needed to switch divs (based on accumulatedDeltaY)
    // currently at a state that allows for one scroll 
    // per div but fast scrolls can do multiple
    const sections = document.querySelectorAll('.section');

    function changeSection(newIndex) {
        if (isAnimating) return; 
        // quick stop if mid transition

        isAnimating = true;
        sections[currentIndex].classList.remove('active');

        currentIndex = newIndex;
        sections[currentIndex].classList.add('active');

        // delays the scroll text color change to match div
        // (not perfect there is slight delay, but works)
        setTimeout(updateScrollInstructionColor, 550);
    }

    function handleScroll(event) {
        if (isScrolling || isAnimating) return; 
        // quick stop if mid transition

        accumulatedDeltaY += Math.abs(event.deltaY); 
        // adds to total scroll amt

        if (accumulatedDeltaY >= scrollThreshold) { 
            if (event.deltaY > 0) { // scroll down
                if (currentIndex < sections.length - 1) { 
                    changeSection(currentIndex + 1); // go down
                } else {
                    changeSection(0); 
                    // cycle back to the first section
                }
            } else { // scroll up
                if (currentIndex > 0) {
                    changeSection(currentIndex - 1); //go up
                } else {
                    changeSection(sections.length - 1); 
                    // cycle back to the last section
                }
            }
            accumulatedDeltaY = 0; // reset scroll amt
        }

        isScrolling = true;
        setTimeout(() => { // delay scroll
            isScrolling = false;
        }, 300); 
        // this value controls the scroll delay (between divs)
    }

    function changeSection(newIndex) { // change divs
        if (isAnimating) return;

        isAnimating = true; // prevents multiple scrolls at once
        sections[currentIndex].classList.remove('active');

        currentIndex = newIndex; 
        sections[currentIndex].classList.add('active');

        // must match scroll speed (to prevent color change delay)
        setTimeout(updateScrollInstructionColor, 600);
    }

    // listen for scroll
    document.addEventListener('wheel', handleScroll);
    
    updateScrollInstructionColor();

    // when visual transition ends, allow scroll again
    sections.forEach(section => {
        section.addEventListener('transitionend', () => {
            isAnimating = false;
            updateScrollInstructionColor(); // Add this line to update the scroll instruction color after the transition
        });
    });
});

function updateScrollInstructionColor() { // change scroll text color
    const currentIndex = [...document.querySelectorAll('.section')].findIndex(section => section.classList.contains('active'));
    const scrollInstruction = document.querySelector('.scrollInstruction');

    if (currentIndex >= 0) {
        if (currentIndex % 2 === 0) { // %2 to flip flop colors
            scrollInstruction.style.color = 'black';
        } else { 
            scrollInstruction.style.color = 'white';
        }
    }
}

setTimeout(updateScrollInstructionColor, 50); 
// delays the color of scroll info to match transition of divs