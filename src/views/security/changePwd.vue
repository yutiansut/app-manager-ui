<template>
  <div class="app-container" style="clear:both;" v-loading="loading">
    <el-row style="width:600px;">
      <el-col :span="24">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-key"></i> Change password</span>
            <el-form ref="form" :model="form" label-width="200px">
              <el-form-item label="New password" prop="newPwd"
                :rules="{
                  required: true, message: 'New password is empty', trigger: 'blur'
                }">
                <el-input type="password" v-model="form.newPwd"></el-input>
              </el-form-item>
              <el-form-item label="Confirm password" prop="confirmPwd"
                :rules="{
                  required: true, validator: validatePass2, trigger: 'blur'
                }">
                <el-input type="password" v-model="form.confirmPwd"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="small" type="primary" @click.prevent="updatePwd()">Submit</el-button>
                <el-button size="small" @click.prevent="reset()">Reset</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>


      </el-col>
    </el-row>
  </div>
</template>

<script>
import {updatePwd} from '@/api/security'
import { Base64 } from 'js-base64'

export default {
  data() {
    return {
      loading:false,
      form: {
        newPwd: "",
        confirmPwd: "",
      },
    }
  },
  mounted() {
  },
  methods: {
    validatePass2(rule, value, callback) {
            if (value === '') {
              callback(new Error('Confirm password is empty'));
            } else if (value !== this.form.newPwd) {
              callback(new Error('New password and confirm password are inconsistent'));
            } else {
              callback();
            }
    },
    reset(){
      this.$refs.form.resetFields();
    },
    updatePwd(){
      this.$refs["form"].validate((valid) => {
        this.loading = true;
        if (valid) {
          updatePwd(this.$store.getters.name, {new_password:Base64.encode(this.form.newPwd)}).then((res)=>{
            this.$message.success('Password update successfully.', 5000);
            this.loading = false;
          }, (res)=>{
            this.loading = false;
          });
        } else {
          this.loading = false;
          return false;
        }
      });
    }
  }
}
</script>

<style>
  .line{
    text-align: center;
  }
</style>
