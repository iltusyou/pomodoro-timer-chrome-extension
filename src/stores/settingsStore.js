import { defineStore } from "pinia";

const defaultSettings = {
  name: "預設設定",
  focusTime: 25,
  shortBreakTime: 10,
  longBreakTime: 15,
  autoStart: false,
  cycleCount: 4, // 每 4 輪番茄鐘後觸發長休息
};

const localStorageKey = 'settings';

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    settings: [],
  }),
  actions: {
    async loadSettings() {
      try {
        const storedSettings = localStorage.getItem(localStorageKey);
        if (storedSettings) {
          this.settings = JSON.parse(storedSettings);
          console.log("設定已載入:", this.settings);
        } else {
          console.log("沒有找到儲存的設定，使用預設值。");
          this.settings = [
            defaultSettings,
            defaultSettings,
            defaultSettings];
          }
      } catch (error) {
        console.error("載入設定失敗:", error);
        throw error;
      }
    },
    updateSettings(index, newSettings) {
      console.log("更新設定:", index, newSettings);
      this.settings[index] = { ...this.settings[index], ...newSettings };
      this.saveSettings();
    },

    async saveSettings() {
      try {
        localStorage.setItem(localStorageKey, JSON.stringify(this.settings));
        console.log("設定已儲存:", this.settings);
      } catch (error) {
        console.error("儲存設定失敗:", error);
        throw error;
      }
    },

    // 重置所有設定
    resetSettings() {
      this.$reset()
      localStorage.removeItem(localStorageKey);
    },
  },
});