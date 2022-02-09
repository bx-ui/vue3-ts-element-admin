<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRule"
      ref="form"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select
          class="lang-select"
          effect="light"
        />
      </div>
      <el-form-item prop="username">
        <svg-icon
          icon="user"
          className="svg-container"
        ></svg-icon>
        <el-input
          :placeholder="$t('msg.login.usernamePlaceHolder')"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <svg-icon
          className="svg-container"
          icon="password"
        ></svg-icon>
        <el-input
          :placeholder="$t('msg.login.passwordPlaceHolder')"
          :type="passwordType"
          v-model="loginForm.password"
        ></el-input>
        <div
          @click="onChangePwdType"
          class="show-pwd"
        >
          <svg-icon :icon="passwordType === 'password' ? 'eye-open' : 'eye'"></svg-icon>
        </div>
      </el-form-item>
      <el-button
        style="width: 100%; height: 37px; margin-top: 18px"
        type="primary"
        @click="handleLogin"
        :loading="loading"
      >{{ $t('msg.login.loginBtn') }}</el-button>

      <div
        class="tips"
        v-html="$t('msg.login.desc')"
      ></div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import { ref, watch } from 'vue'
import { LoginForm } from './types'
import { validatePassword } from './rules'
import type { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const store = useStore()
const i18n = useI18n()

const rules = {
  username: {
    required: true,
    message: i18n.t('msg.login.usernameRule'),
    trigger: 'blur'
  },
  password: {
    validator: validatePassword(),
    trigger: 'blur'
  }
}

const form = ref<InstanceType<typeof ElForm>>()

const loginForm = ref<LoginForm>({
  username: 'fgw',
  password: '123456Abc'
})

const loginRule = ref(rules)

watch(
  () => store.getters.language,
  () => {
    loginRule.value = rules
  }
)

const loading = ref<boolean>(false)

const passwordType = ref<'text' | 'password'>('password')

const onChangePwdType = () => {
  passwordType.value = passwordType.value === 'text' ? 'password' : 'text'
}

const handleLogin = () => {
  console.log(store)

  form.value!.validate((valid: any) => {
    if (valid) {
      loading.value = true
      store.dispatch('user/login', loginForm.value).then(() => {
        loading.value = false
        // TODO: 后续操作
      })
    }
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background: $bg;

  .login-form {
    position: relative;
    width: 520px;
    max-height: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      ::v-deep .lang-select {
        position: absolute;
        right: 0;
        top: 14px;
        font-size: 22px;
        color: #fff;
        background: #fff;
        cursor: pointer;
      }
    }

    ::v-deep .svg-container {
      width: 1em;
      height: 1em;
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .show-pwd {
      width: 1em;
      height: 1em;
      position: absolute;
      right: 20px;
      top: 10px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .tips {
      color: #fff;
      margin-top: 30px;
      margin-bottom: 12px;
    }
  }
}
</style>
