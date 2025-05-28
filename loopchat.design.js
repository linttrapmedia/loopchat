/**
 * LoopChat Design System
 * This file contains design tokens and variables used throughout the application
 */
((LOOPCHAT) => {
  // Make sure LOOPCHAT is defined
  if (typeof LOOPCHAT === 'undefined') {
    console.error('LOOPCHAT is not defined');
    return;
  }
  
  /**
   * Design tokens for the LoopChat application
   * These are global variables that define the design system
   */
  LOOPCHAT.prototype.design = {
    // Color palette
    colors: {
      // Primary brand colors
      primary: {
        main: "#000000",      // Black - primary brand color
        light: "#222222",     // Light black - for hover states
        lighter: "#444444",   // Lighter black - for active states
        accent: "#4A6DA7"     // Blue - accent color
      },
      // UI colors
      ui: {
        background: "#f5f6fa", // Light gray-blue background
        surface: "#ffffff",    // White surface
        border: "#e0e0e0",     // Light gray border
        divider: "#e0e0e0",    // Light gray divider
        hover: "#f0f0f0",      // Light gray hover
        shadow: "rgba(0,0,0,0.2)" // Shadow color
      },
      // Text colors
      text: {
        primary: "#000000",    // Black text
        secondary: "#606060",  // Dark gray text
        tertiary: "#808080",   // Gray text
        inverted: "#ffffff"    // White text (on dark backgrounds)
      },
      // Status colors
      status: {
        pending: {
          bg: "#e0e0e0",
          text: "#606060"
        },
        in_progress: {
          bg: "#b3e0ff",
          text: "#0066cc"
        },
        completed: {
          bg: "#c6f0c6",
          text: "#2e7d32"
        },
        cancelled: {
          bg: "#ffcccc",
          text: "#c62828"
        }
      },
      // Priority colors
      priority: {
        high: {
          bg: "#ffcccc",
          text: "#c62828"
        },
        medium: {
          bg: "#fff0b3",
          text: "#a67c00"
        },
        low: {
          bg: "#e0e0e0",
          text: "#606060"
        }
      }
    },
    
    // Typography
    typography: {
      fontFamily: {
        primary: "monospace",
        code: "monospace"
      },
      fontSize: {
        xs: "10px",
        sm: "11px",
        base: "12px",
        md: "14px",
        lg: "16px"
      },
      fontWeight: {
        normal: "normal",
        bold: "bold"
      },
      lineHeight: {
        tight: "1.2",
        normal: "1.4",
        relaxed: "1.6"
      }
    },
    
    // Spacing
    spacing: {
      xxs: "2px",
      xs: "4px",
      sm: "6px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      xxl: "20px",
      xxxl: "24px"
    },
    
    // Borders & Radius
    borders: {
      width: {
        thin: "1px",
        medium: "2px",
        thick: "3px"
      },
      radius: {
        sm: "3px",
        md: "4px",
        lg: "6px",
        pill: "12px"
      }
    },
    
    // Shadows
    shadows: {
      sm: "0 1px 3px rgba(0,0,0,0.1)",
      md: "0 2px 5px rgba(0,0,0,0.2)",
      lg: "0 4px 10px rgba(0,0,0,0.3)"
    },
    
    // Z-index
    zIndex: {
      base: "1",
      window: "10",
      windowFocus: "100",
      modal: "1000",
      dropdown: "9999",
      toolbar: "50"
    },
    
    // Animation
    animation: {
      duration: {
        fast: "0.1s",
        normal: "0.2s",
        slow: "0.3s"
      },
      easing: {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out"
      }
    },
    
    // Window sizes
    windows: {
      minWidth: "200px",
      minHeight: "150px",
      defaultWidth: {
        small: "300px",
        medium: "500px",
        large: "600px"
      },
      defaultHeight: {
        small: "200px",
        medium: "300px", 
        large: "400px"
      }
    },
    
    // Component-specific styles
    components: {
      toolbar: {
        height: "30px",
        background: "#000000",
        color: "#ffffff"
      },
      window: {
        header: {
          height: "28px",
          paddingX: "6px",
          paddingY: "4px",
          background: "#000000",
          backgroundFocus: "#222222",
          color: "#ffffff",
          fontSize: "11px"
        }
      },
      button: {
        primary: {
          background: "#000000",
          color: "#ffffff",
          border: "none",
          hoverBackground: "#222222"
        },
        secondary: {
          background: "transparent",
          color: "#000000", 
          border: "1px solid #000000",
          hoverBackground: "#f0f0f0"
        },
        tertiary: {
          background: "transparent",
          color: "#000000",
          border: "1px solid #e0e0e0",
          hoverBackground: "#f0f0f0"
        },
        danger: {
          background: "#ffcccc",
          color: "#c62828",
          border: "none",
          hoverBackground: "#ffb3b3"
        },
        success: {
          background: "#c6f0c6",
          color: "#2e7d32",
          border: "none",
          hoverBackground: "#b3e6b3"
        },
        info: {
          background: "#b3e0ff",
          color: "#0066cc",
          border: "none",
          hoverBackground: "#99d6ff"
        }
      },
      input: {
        background: "#ffffff",
        border: "1px solid #e0e0e0",
        borderRadius: "3px",
        color: "#000000",
        padding: "6px",
        focusBorder: "1px solid #4A6DA7"
      },
      badge: {
        paddingX: "6px",
        paddingY: "2px",
        borderRadius: "12px",
        fontSize: "10px",
        fontWeight: "bold"
      },
      table: {
        headerBackground: "#e0e0e0",
        rowEvenBackground: "#f9f9f9",
        rowOddBackground: "#ffffff",
        rowHoverBackground: "#f0f0f0",
        borderColor: "#e0e0e0"
      }
    }
  };
  
  /**
   * Helper function to apply design tokens to an element
   * @param {HTMLElement} element - The element to style
   * @param {Object} styles - The styles to apply
   */
  LOOPCHAT.prototype.applyStyles = function(element, styles) {
    if (!element || !styles) return;
    
    Object.keys(styles).forEach(key => {
      element.style[key] = styles[key];
    });
    
    return element;
  };
  
  /**
   * Creates a styled button based on design tokens
   * @param {string} text - Button text
   * @param {string} type - Button type (primary, secondary, tertiary, danger, success, info)
   * @param {Object} [options] - Additional options
   * @returns {HTMLElement} The styled button
   */
  LOOPCHAT.prototype.createButton = function(text, type = 'primary', options = {}) {
    const button = document.createElement('button');
    button.innerText = text;
    
    // Get button styles from design tokens
    const buttonStyle = this.design.components.button[type] || this.design.components.button.primary;
    
    // Apply base styles
    this.applyStyles(button, {
      padding: `${this.design.spacing.xs} ${this.design.spacing.sm}`,
      backgroundColor: buttonStyle.background,
      color: buttonStyle.color,
      border: buttonStyle.border,
      borderRadius: this.design.borders.radius.sm,
      cursor: 'pointer',
      fontFamily: this.design.typography.fontFamily.primary,
      fontSize: this.design.typography.fontSize.base,
      fontWeight: options.bold ? this.design.typography.fontWeight.bold : this.design.typography.fontWeight.normal
    });
    
    // Add hover effect
    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = buttonStyle.hoverBackground;
    });
    
    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = buttonStyle.background;
    });
    
    // Add click handler if provided
    if (options.onClick) {
      button.addEventListener('click', options.onClick);
    }
    
    return button;
  };
  
  /**
   * Creates a status badge based on design tokens
   * @param {string} status - Status value (pending, in_progress, completed, cancelled)
   * @returns {HTMLElement} The styled badge
   */
  LOOPCHAT.prototype.createStatusBadge = function(status) {
    const badge = document.createElement('span');
    badge.innerText = status;
    
    // Get status styles from design tokens
    const statusStyle = this.design.colors.status[status] || this.design.colors.status.pending;
    
    // Apply styles
    this.applyStyles(badge, {
      padding: `${this.design.components.badge.paddingY} ${this.design.components.badge.paddingX}`,
      borderRadius: this.design.components.badge.borderRadius,
      fontSize: this.design.components.badge.fontSize,
      fontWeight: this.design.components.badge.fontWeight,
      textTransform: 'uppercase',
      backgroundColor: statusStyle.bg,
      color: statusStyle.text
    });
    
    return badge;
  };
  
  /**
   * Creates a priority badge based on design tokens
   * @param {string} priority - Priority value (high, medium, low)
   * @returns {HTMLElement} The styled badge
   */
  LOOPCHAT.prototype.createPriorityBadge = function(priority) {
    const badge = document.createElement('span');
    badge.innerText = priority;
    
    // Get priority styles from design tokens
    const priorityStyle = this.design.colors.priority[priority] || this.design.colors.priority.medium;
    
    // Apply styles
    this.applyStyles(badge, {
      padding: `${this.design.components.badge.paddingY} ${this.design.components.badge.paddingX}`,
      borderRadius: this.design.components.badge.borderRadius,
      fontSize: this.design.components.badge.fontSize,
      fontWeight: this.design.components.badge.fontWeight,
      textTransform: 'uppercase',
      backgroundColor: priorityStyle.bg,
      color: priorityStyle.text
    });
    
    return badge;
  };
})(window.LoopChat);