import PageState from "./page-state";
import SharedState from "./shared-state";

const Page = new PageState();
const Shared = new SharedState();

export default function useStateManager() {
  return {
    PageState: Page,
    SharedState: Shared,
  };
}