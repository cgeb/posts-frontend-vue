import { Store } from "@/store";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import Timeline from "../../src/components/Timeline.vue";
import { thisMonth, thisWeek, today } from "../../src/mocks";

jest.mock("axios", () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  },
}));

const mountTimeline = () => {
  const store = new Store({
    posts: {
      ids: [],
      all: new Map(),
      loaded: false,
    },
    users: {
      ids: ["10000"],
      all: new Map([
        [
          "10000",
          {
            username: "username",
            id: "10000",
          },
        ],
      ]),
      loaded: true,
      currentUserId: "10000",
    },
  });

  const testComp = {
    components: { Timeline },
    template: `
      <suspense>
        <template #default>
          <timeline />
        </template>
        <template #fallback>
          Loading ...
        </template>
      </suspense>
    `,
  };

  return mount(testComp, {
    global: {
      components: {
        RouterLink: RouterLinkStub,
      },
      plugins: [store],
    },
  });
};

describe("Timeline", () => {
  it("renders today post default", async () => {
    const wrapper = mountTimeline();
    await flushPromises();

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  });

  it("update when the period is click (This Week)", async () => {
    const wrapper = mountTimeline();
    await flushPromises();

    await wrapper.get("[data-test='This Week']").trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
  });

  it("renders today post default (This Month)", async () => {
    const wrapper = mountTimeline();
    await flushPromises();

    await wrapper.get("[data-test='This Month']").trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisMonth.created.format("Do MMM"));
  });
});
