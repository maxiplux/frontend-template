# Product Guidelines

These guidelines define the visual and behavioral standards for the application, ensuring consistency across all features and future derivatives.

## Tone and Voice
- **Professional and Efficient:** The interface and documentation should be clear, direct, and task-oriented. Use precise terminology that helps administrative users navigate complex data without ambiguity.

## Visual Identity
- **Clean and Minimalist:** Prioritize clarity by using ample whitespace, a limited color palette, and clear typography. The design should focus on data accessibility rather than decorative elements.
- **Enterprise-Ready:** Utilize standard dashboard layouts and UI patterns that administrative users are already familiar with, reducing the learning curve.

## Implementation Principles
- **Strict Modularity:** All code must be organized into clear architectural boundaries (`core`, `features`, `shared`). Each module should have a single, well-defined responsibility to facilitate reusability and testing.
- **Utility-First Styling:** Use Tailwind CSS utility classes for all styling needs. Custom CSS should be avoided unless absolutely necessary for complex animations or integrating third-party libraries that do not support Tailwind.
- **Component Consistency:** Leverage PrimeNG's component library to ensure a robust and accessible user experience. Modifications to component behavior should be centralized through theming or shared directives.
