# AI Coach: State Architecture & Optimization Plan.

## State Inventory

### Feature: [e.g., Template Builder - `templates/builder`]

- **State:** `workoutTemplate`
  - **Location:** `app/templates/builder/page.tsx`
  - **Hook:** `useState`
  - **Description:** Stores the large, nested object for the workout as the user creates it.
  - **Analysis & Hypothesis:** This state is passed down as props to multiple components (`WeeklyStructureStep`, `ExerciseSelectionModal`, etc.), causing prop drilling. The update logic is likely complex and spread out.
  - **Actionable Hypothesis:** This is a prime candidate to be moved into a `useReducer` and provided via a new `TemplateBuilderContext`. The state shape itself should be **normalized** to simplify updates.