<template>
  <el-form :model="edit_setting" label-width="auto" style="max-width: 600px">
    <el-form-item label="設定檔">
      <el-select
        v-model="edit_index"
        placeholder="Select"
        size="large"
        style="width: 240px"
        @change="changeSetting()"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="設定名稱">
      <el-input
        v-model="edit_setting.name"
        placeholder="請輸入設定名稱"
      ></el-input>
    </el-form-item>
    <el-form-item label="專注時間">
      <el-input
        v-model="edit_setting.focusTime"
        type="number"
        placeholder="請輸入專注時間(分鐘)"
      ></el-input>
    </el-form-item>
    <el-form-item label="短休息時間">
      <el-input
        v-model="edit_setting.shortBreakTime"
        type="number"
        placeholder="請輸入短休息時間(分鐘)"
      ></el-input>
    </el-form-item>
    <el-form-item label="長休息時間">
      <el-input
        v-model="edit_setting.longBreakTime"
        type="number"
        placeholder="請輸入長休息時間(分鐘)"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">儲存設定</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useSettingsStore } from "../stores/settingsStore.js";

const settingsStore = useSettingsStore();

const edit_index = ref(0);
const edit_setting = ref({});

const options = computed(() =>
  settingsStore.settings.map((setting, index) => ({
    value: index,
    label: `設定檔 ${index + 1}- ${setting.name || "未命名"}`,
  }))
);

onBeforeMount(() => {

  console.log("Settings store reset:", settingsStore.settings);

  // 初始化設定
  settingsStore.loadSettings();

  console.log("Settings before mount:", settingsStore.settings);

  edit_setting.value = settingsStore.settings[0];
  console.log("Edit setting initialized:", edit_setting.value);
});


const changeSetting = () => {
  edit_setting.value = settingsStore.settings[edit_index.value];
  console.log("Selected setting index:", edit_index.value);
  console.log("Changed setting to:", edit_setting.value);
};

const onSubmit = () => {
  settingsStore.updateSettings(edit_index.value, edit_setting.value);
};
</script>
