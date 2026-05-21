document.addEventListener('DOMContentLoaded', () => {
    // --- Define your image lists for each theme ---
    // Replace these with the actual paths to your images.
    // Make sure these paths are accessible from your output directory (e.g., 'img/theme_story/image.jpg')

    const storyImages = [
        'img/theme_story/story1.jpg',
        'img/theme_story/story2.jpg',
        'img/theme_story/story3.jpg',
        'img/theme_story/story4.jpg',
        'img/theme_story/story5.jpg',
        'img/theme_story/story6.jpg',
        'img/theme_story/story7.jpg',
        'img/theme_story/story8.jpg',
        'img/theme_story/story9.jpg'
        // Add more images specific to "The Story"
    ];

    const arrowImages = [
        'img/theme_arrows/arrows1.jpg',
        'img/theme_arrows/arrows2.jpg',
        'img/theme_arrows/arrows3.jpg',
        'img/theme_arrows/arrows4.jpg',
        'img/theme_arrows/arrows5.jpg',
        'img/theme_arrows/arrows6.jpg',
        'img/theme_arrows/arrows7.jpg',
        'img/theme_arrows/arrows8.jpg',
        'img/theme_arrows/arrows9.jpg',
        'img/theme_arrows/arrows10.jpg',
        'img/theme_arrows/arrows11.jpg',
        'img/theme_arrows/arrows12.jpg',
        'img/theme_arrows/arrows13.jpg',
        'img/theme_arrows/arrows14.jpg',
        'img/theme_arrows/arrows15.jpg',
        'img/theme_arrows/arrows16.jpg'
        // Add more images specific to "The Arrows"
    ];

    const peopleImages = [
        'img/theme_people/people1.jpg',
        'img/theme_people/people2.jpg',
        'img/theme_people/people3.jpg',
        'img/theme_people/people4.jpg',
        'img/theme_people/people5.jpg',
        'img/theme_people/people6.jpg',
        'img/theme_people/people7.jpg',
        'img/theme_people/people8.jpg',
        'img/theme_people/people9.jpg',
        'img/theme_people/people10.jpg',
        'img/theme_people/people11.jpg',
        'img/theme_people/people12.jpg'
        // Add more images specific to "The People"
    ];

    // --- Get references to the panel elements ---
    // Selects all <a> tags with class "image-panel" within the "panel-container"
    const imagePanelElements = document.querySelectorAll('.panel-container > .image-panel');

    let panelImgStory, panelImgArrows, panelImgPeople;

    if (imagePanelElements.length >= 3) {
        // Assuming the order in HTML corresponds to: Story, Arrows, People
        panelImgStory = imagePanelElements[0].querySelector('img');
        panelImgArrows = imagePanelElements[1].querySelector('img');
        panelImgPeople = imagePanelElements[2].querySelector('img');
    } else {
        console.error("Could not find enough '.image-panel' elements. Expected 3, found:", imagePanelElements.length);
        return; // Stop if we don't have the panels
    }

    // --- Helper function to get a random image from an array ---
    function getRandomImage(imageArray) {
        if (!imageArray || imageArray.length === 0) {
            console.warn("Image array is empty or undefined.");
            return null;
        }
        const randomIndex = Math.floor(Math.random() * imageArray.length);
        return imageArray[randomIndex];
    }

    // --- Helper function to generate basic alt text (customize for better accessibility) ---
    function generateAltText(imagePath, themeName) {
        if (!imagePath) {
            return `Placeholder image for ${themeName}`;
        }
        try {
            let filename = imagePath.split('/').pop().split('.')[0]; // Basic filename extraction
            // For Eleventy paths like "{{ '/img/file.jpg' | url }}", this might need adjustment
            // if the 'url' filter adds complex characters or if the raw path is preferred for alt text generation.
            // This example assumes the string in the array is the final URL.
            if (filename.includes("{{ ") || filename.includes(" | url }}")) { // Handle Eleventy-like strings if not resolved
                 filename = themeName.toLowerCase().replace(/\s+/g, '_') + "_image";
            }
            return filename.replace(/[_|-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ` - ${themeName}`;
        } catch (e) {
            return `Image related to ${themeName}`;
        }
    }

    // --- Assign images to panels based on themes ---
    if (panelImgStory) {
        const selectedStoryImage = getRandomImage(storyImages);
        if (selectedStoryImage) {
            panelImgStory.src = selectedStoryImage;
            panelImgStory.alt = generateAltText(selectedStoryImage, "The Story");
        } else {
            panelImgStory.alt = "Image for The Story coming soon";
            // panelImgStory.src = '{{ "/img/placeholders/story_default.jpg" | url }}'; // Optional placeholder
        }
    } else {
        console.error("Image element for 'The Story' panel not found or panel itself is missing.");
    }

    if (panelImgArrows) {
        const selectedArrowImage = getRandomImage(arrowImages);
        if (selectedArrowImage) {
            panelImgArrows.src = selectedArrowImage;
            panelImgArrows.alt = generateAltText(selectedArrowImage, "The Arrows");
        } else {
            panelImgArrows.alt = "Image for The Arrows coming soon";
            // panelImgArrows.src = '{{ "/img/placeholders/arrows_default.jpg" | url }}'; // Optional placeholder
        }
    } else {
        console.error("Image element for 'The Arrows' panel not found or panel itself is missing.");
    }

    if (panelImgPeople) {
        const selectedPeopleImage = getRandomImage(peopleImages);
        if (selectedPeopleImage) {
            panelImgPeople.src = selectedPeopleImage;
            panelImgPeople.alt = generateAltText(selectedPeopleImage, "The People");
        } else {
            panelImgPeople.alt = "Image for The People coming soon";
            // panelImgPeople.src = '{{ "/img/placeholders/people_default.jpg" | url }}'; // Optional placeholder
        }
    } else {
        console.error("Image element for 'The People' panel not found or panel itself is missing.");
    }
});