import { test, expect } from '@playwright/test';

test.describe('DOM Freezing and Debugging Techniques', () => {
  
  test('demonstrate setTimeout debugger technique', async ({ page }) => {
    // Navigate to a page that has dynamic content changes
    await page.goto('https://demoqa.com/dynamic-properties');
    
    // Method 1: Using setTimeout with debugger to pause after navigation/save actions
    // This technique is useful when you want to pause after a specific delay
    // even if the page updates during that time
    
    console.log('=== Demonstrating setTimeout Debugger Technique ===');
    
    // Inject the setTimeout debugger before performing actions
    await page.evaluate(() => {
      // This will pause execution after 6 seconds, surviving page updates
      setTimeout(() => { 
        debugger; 
      }, 6000);
    });
    
    // Perform an action that might cause page updates
    await page.click('#enableAfter');
    
    // Wait for the element to become enabled (simulating save action)
    await page.waitForSelector('#enableAfter:enabled', { timeout: 10000 });
    
    console.log('setTimeout debugger technique applied - execution will pause after 6 seconds');
  });

  test('demonstrate DOM-based breakpoint technique', async ({ page }) => {
    // Navigate to a page with dynamic content
    await page.goto('https://demoqa.com/dynamic-properties');
    
    console.log('=== Demonstrating DOM-Based Breakpoint Technique ===');
    
    // Method 2: Using Playwright's built-in debugging capabilities
    // to simulate DOM-based breakpoints
    
    // Set up a mutation observer to detect DOM changes
    await page.evaluate(() => {
      // Create a MutationObserver to watch for changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            console.log('DOM change detected:', mutation);
            // In real DevTools, this would trigger a breakpoint
            debugger;
          }
        });
      });
      
      // Start observing the document with subtree modifications
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true
      });
    });
    
    // Perform an action that will modify the DOM
    await page.click('#colorChange');
    
    // Wait for the color change to take effect
    await page.waitForTimeout(2000);
    
    console.log('DOM-based breakpoint technique applied - execution paused on DOM changes');
  });

  test('practical example: Salesforce-style form submission with debugging', async ({ page }) => {
    // Navigate to a form that simulates Salesforce-like behavior
    await page.goto('https://demoqa.com/text-box');
    
    console.log('=== Practical Example: Form Submission with Debugging ===');
    
    // Fill out the form
    await page.fill('#userName', 'John Doe');
    await page.fill('#userEmail', 'john.doe@example.com');
    await page.fill('#currentAddress', '123 Main St');
    await page.fill('#permanentAddress', '456 Oak Ave');
    
    // Method 1: setTimeout debugger before form submission
    await page.evaluate(() => {
      console.log('Setting up setTimeout debugger for form submission...');
      setTimeout(() => { 
        console.log('Debugger triggered after form submission');
        debugger; 
      }, 3000);
    });
    
    // Set up DOM mutation observer for the output area
    await page.evaluate(() => {
      const outputDiv = document.querySelector('#output');
      if (outputDiv) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              console.log('Form output detected:', mutation.addedNodes);
              debugger; // This simulates a DOM-based breakpoint
            }
          });
        });
        
        observer.observe(outputDiv, {
          childList: true,
          subtree: true
        });
      }
    });
    
    // Submit the form (this will cause DOM changes)
    await page.click('#submit');
    
    // Wait for the output to appear
    await page.waitForSelector('#output', { state: 'visible' });
    
    // Verify the form data was submitted correctly
    const outputText = await page.textContent('#output');
    expect(outputText).toContain('John Doe');
    expect(outputText).toContain('john.doe@example.com');
    
    console.log('Form submission completed with debugging techniques applied');
  });

  test('advanced debugging: handling dynamic content loading', async ({ page }) => {
    // Navigate to a page with dynamic loading
    await page.goto('https://demoqa.com/progress-bar');
    
    console.log('=== Advanced Debugging: Dynamic Content Loading ===');
    
    // Set up comprehensive debugging for dynamic content
    await page.evaluate(() => {
      // Multiple debugging techniques combined
      
      // 1. setTimeout debugger for overall timing
      setTimeout(() => {
        console.log('General timeout debugger triggered');
        debugger;
      }, 5000);
      
      // 2. DOM mutation observer for specific element changes
      const progressBar = document.querySelector('#progressBar');
      if (progressBar) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'aria-valuenow') {
              const newValue = progressBar.getAttribute('aria-valuenow');
              console.log(`Progress updated to: ${newValue}%`);
              if (newValue && parseInt(newValue) >= 50) {
                console.log('Progress reached 50% - triggering debugger');
                debugger;
              }
            }
          });
        });
        
        observer.observe(progressBar, {
          attributes: true,
          attributeFilter: ['aria-valuenow']
        });
      }
      
      // 3. Event listener for specific events
      progressBar?.addEventListener('transitionend', () => {
        console.log('Progress bar transition completed');
        debugger;
      });
    });
    
    // Start the progress bar
    await page.click('#startStopButton');
    
    // Wait for progress to complete
    await page.waitForSelector('//div[text()="100%"]', { timeout: 15000 });
    
    console.log('Dynamic content loading debugging demonstration completed');
  });

  test('best practices for debugging in production-like scenarios', async ({ page }) => {
    console.log('=== Best Practices Summary ===');
    
    // Navigate to a complex page
    await page.goto('https://demoqa.com/');
    
    // Best Practice 1: Conditional debugging
    await page.evaluate(() => {
      const DEBUG_MODE = true; // This could come from environment variables
      
      if (DEBUG_MODE) {
        // Only set up debugging in debug mode
        setTimeout(() => {
          console.log('Debug mode: Pausing execution');
          debugger;
        }, 2000);
      }
    });
    
    // Best Practice 2: Targeted element observation
    await page.evaluate(() => {
      // Watch specific elements that are likely to change
      const elementsToWatch = [
        '#userName',
        '#userEmail', 
        '#submit',
        '.alert'
      ];
      
      elementsToWatch.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          const observer = new MutationObserver(() => {
            console.log(`Element ${selector} changed`);
            debugger;
          });
          
          observer.observe(element, {
            attributes: true,
            childList: true,
            subtree: true
          });
        }
      });
    });
    
    console.log('Best practices for debugging implemented');
    console.log('Key takeaways:');
    console.log('1. Use setTimeout debugger for timing-based debugging');
    console.log('2. Use DOM mutation observers for element-specific debugging');
    console.log('3. Combine multiple techniques for comprehensive debugging');
    console.log('4. Use conditional debugging for production environments');
  });
});
