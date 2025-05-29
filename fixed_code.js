    // Create a function to update window management options based on auto-tile state
    const updateCascadeAndTileOptions = (isEnabled) => {
      // For all three buttons (minimizeAllOption, cascadeOption, tileOption)
      const buttons = [minimizeAllOption, cascadeOption, tileOption];
      
      if (isEnabled) {
        // Disable all buttons
        buttons.forEach(button => {
          // Visual disabling
          button.style.opacity = "0.5";
          button.style.color = this.design.colors.text.tertiary;
          button.style.cursor = "not-allowed";
          button.title = "Disabled when auto-tile is on";
          
          // Functional disabling - clone the node to remove all event listeners
          if (!button._disabled) {
            const clone = button.cloneNode(true);
            button.parentNode.replaceChild(clone, button);
            
            // Store reference to original button
            clone._originalButton = button;
            clone._disabled = true;
            
            // Add a click handler that does nothing but prevent event propagation
            clone.addEventListener("click", e => {
              e.stopPropagation();
              e.preventDefault();
              console.log("Button disabled - auto-tile is on");
              return false;
            });
            
            // Replace the reference in our local scope
            if (button === minimizeAllOption) minimizeAllOption = clone;
            if (button === cascadeOption) cascadeOption = clone;
            if (button === tileOption) tileOption = clone;
          }
        });
      } else {
        // Re-enable all buttons by restoring originals if they were disabled
        buttons.forEach(button => {
          if (button._disabled && button._originalButton) {
            // Restore original button with all its event handlers
            button.parentNode.replaceChild(button._originalButton, button);
            
            // Update our references
            if (button === minimizeAllOption) minimizeAllOption = button._originalButton;
            if (button === cascadeOption) cascadeOption = button._originalButton;
            if (button === tileOption) tileOption = button._originalButton;
          } else if (button._disabled) {
            // Just restore visual state if we don't have the original
            button.style.opacity = "1";
            button.style.color = this.design.colors.text.primary;
            button.style.cursor = "pointer";
            button.title = "";
            button._disabled = false;
          }
        });
      }
    };