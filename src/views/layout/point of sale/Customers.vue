<template>
    <div class="col-xs-10 col-xs-push-1 m-b-md m-t-md">
        <div class="row">
            <div class="col-xs-3">
                <a @click="$router.go(-1)" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
            </div>
            <div class="col-xs-6">
                <h2 class="text-center" style="margin-top: 10px">Customer</h2>
            </div>
        </div>
        <div class="hr-line-dashed"></div>
        <div class="row m-b-md">
            <div class="col-xs-8 col-xs-push-2">
                <form>
                    <div class="input-group">
                        <input type="text" placeholder="Search Customer" name="search" class="form-control">
                        <div class="input-group-btn">
                            <button class="btn  btn-primary" type="submit">
                                Search
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
        <div class="row">
            <div class="ibox-content" style="border:  1px solid #e7eaec;">
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>

                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Michael Kamau</td>
                            <td>3881</td>
                            <td>michaelkinare@gmail.com</td>
                            <td>0708338855</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Customers"
    }
</script>

<style scoped>

</style>