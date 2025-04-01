// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Typed.js initialization
    var typed = new Typed('#typed-text', {
        strings: ['Data Scientist', 'Machine Learning Engineer', 'AI Researcher', 'Data Storyteller'],
        typeSpeed: 40,
        backSpeed: 20,
        backDelay: 1500,
        loop: true
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillSection = document.querySelector('#about');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;
        const skillSectionTop = skillSection.getBoundingClientRect().top;
        
        if (skillSectionTop < triggerBottom) {
            skillBars.forEach(skillBar => {
                skillBar.style.width = skillBar.parentElement.previousElementSibling.lastElementChild.textContent;
            });
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
    
    // D3.js Chart
    createChart();
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            let isValid = true;
            let errorMessage = '';
            
            if (!name.trim()) {
                isValid = false;
                errorMessage += 'Name is required.\n';
            }
            
            if (!email.trim()) {
                isValid = false;
                errorMessage += 'Email is required.\n';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!subject.trim()) {
                isValid = false;
                errorMessage += 'Subject is required.\n';
            }
            
            if (!message.trim()) {
                isValid = false;
                errorMessage += 'Message is required.\n';
            }
            
            if (!isValid) {
                alert('Please correct the following errors:\n' + errorMessage);
                return;
            }
            
            // If form is valid, you would typically submit to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Function to create D3.js chart with tooltips
function createChart() {
    const data = [
        {category: "Clustering", value: 25},
        {category: "Classification", value: 35},
        {category: "Regression", value: 30},
        {category: "NLP", value: 20},
        {category: "Computer Vision", value: 15}
    ];
    
    const chartContainer = document.getElementById('chart-container');
    if (!chartContainer) return;
    
    // Clear previous chart if it exists
    chartContainer.innerHTML = '';
    
    const margin = {top: 40, right: 30, bottom: 50, left: 50};
    const width = chartContainer.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, width])
        .padding(0.2);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) * 1.2])
        .range([height, 0]);
    
    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + "%"));
    
    // Add Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 10)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Project Distribution (%)");
    
    // Add tooltip div
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "#fff")
        .style("border", "1px solid #ddd")
        .style("padding", "10px")
        .style("border-radius", "5px")
        .style("pointer-events", "none")
        .style("box-shadow", "0 5px 10px rgba(0,0,0,0.1)")
        .style("font-size", "14px");
    
    // Create bars with animations and tooltips
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.category))
        .attr("y", height) // Start from bottom for animation
        .attr("width", x.bandwidth())
        .attr("height", 0) // Start with height 0 for animation
        .attr("fill", d => {
            // Color scale from light to dark blue based on value
            const intensity = Math.floor((d.value / d3.max(data, d => d.value)) * 100);
            return `rgba(10, 61, 98, ${0.4 + (intensity/100) * 0.6})`;
        })
        .attr("rx", 3) // Rounded corners
        .attr("ry", 3)
        // Add tooltip on mouseover
        .on("mouseover", function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 0.8);
                
            tooltip.transition()
                .duration(200)
                .style("opacity", 1);
                
            tooltip.html(`<strong>${d.category}</strong><br>${d.value}% of projects`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("opacity", 1);
                
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        // Animate bars on load
        .transition()
        .duration(1000)
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value));
        
    // Chart Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Project Distribution by Type");
}