<template>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-lg-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-success pull-right">Monthly</span>
                        <h5>Income</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">40 886,200</h1>
                        <div class="stat-percent font-bold text-success">98% <i class="fa fa-bolt"></i></div>
                        <small>Total income</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-info pull-right">Annual</span>
                        <h5>Orders</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">275,800</h1>
                        <div class="stat-percent font-bold text-info">20% <i class="fa fa-level-up"></i></div>
                        <small>New orders</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-primary pull-right">Today</span>
                        <h5>visits</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">106,120</h1>
                        <div class="stat-percent font-bold text-navy">44% <i class="fa fa-level-up"></i></div>
                        <small>New visits</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-danger pull-right">Low value</span>
                        <h5>User activity</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">80,600</h1>
                        <div class="stat-percent font-bold text-danger">38% <i class="fa fa-level-down"></i></div>
                        <small>In first month</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>Orders</h5>
                        <div class="pull-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-xs btn-white active">Today</button>
                                <button type="button" class="btn btn-xs btn-white">Monthly</button>
                                <button type="button" class="btn btn-xs btn-white">Annual</button>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">

                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>Orders</h5>
                        <div class="pull-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-xs btn-white active">Today</button>
                                <button type="button" class="btn btn-xs btn-white">Weekly</button>
                                <button type="button" class="btn btn-xs btn-white">Monthly</button>
                                <button type="button" class="btn btn-xs btn-white">Annual</button>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label class="control-label" for="product_name">Product Name</label>
                                    <input type="text" id="product_name" name="product_name" value="" placeholder="Project Name" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <label class="control-label" for="price">Category</label>
                                    <input type="text" id="price" name="price" value="" placeholder="Name" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <label class="control-label" for="quantity">User</label>
                                    <input type="text" id="quantity" name="quantity" value="" placeholder="Company" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label class="control-label" for="status">Status</label>
                                    <select name="status" id="status" class="form-control">
                                        <option value="1" selected="">Paid</option>
                                        <option value="0">Pending</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-striped">
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Master project</td>
                                    <td>Patrick Smith</td>
                                    <td>$892,074</td>
                                    <td>Inceptos Hymenaeos Ltd</td>
                                    <td><strong>20%</strong></td>
                                    <td>Jul 14, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Alpha project</td>
                                    <td>Alice Jackson</td>
                                    <td>$963,486</td>
                                    <td>Nec Euismod In Company</td>
                                    <td><strong>40%</strong></td>
                                    <td>Jul 16, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Betha project</td>
                                    <td>John Smith</td>
                                    <td>$996,824</td>
                                    <td>Erat Volutpat</td>
                                    <td><strong>75%</strong></td>
                                    <td>Jul 18, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Gamma project</td>
                                    <td>Anna Jordan</td>
                                    <td>$105,192</td>
                                    <td>Tellus Ltd</td>
                                    <td><strong>18%</strong></td>
                                    <td>Jul 22, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Alpha project</td>
                                    <td>Alice Jackson</td>
                                    <td>$674,803</td>
                                    <td>Nec Euismod In Company</td>
                                    <td><strong>40%</strong></td>
                                    <td>Jul 16, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Master project</td>
                                    <td>Patrick Smith</td>
                                    <td>$174,729</td>
                                    <td>Inceptos Hymenaeos Ltd</td>
                                    <td><strong>20%</strong></td>
                                    <td>Jul 14, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Gamma project</td>
                                    <td>Anna Jordan</td>
                                    <td>$823,198</td>
                                    <td>Tellus Ltd</td>
                                    <td><strong>18%</strong></td>
                                    <td>Jul 22, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Project <small>This is example of project</small></td>
                                    <td>Patrick Smith</td>
                                    <td>$778,696</td>
                                    <td>Inceptos Hymenaeos Ltd</td>
                                    <td><strong>20%</strong></td>
                                    <td>Jul 14, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Alpha project</td>
                                    <td>Alice Jackson</td>
                                    <td>$861,063</td>
                                    <td>Nec Euismod In Company</td>
                                    <td><strong>40%</strong></td>
                                    <td>Jul 16, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Betha project</td>
                                    <td>John Smith</td>
                                    <td>$109,125</td>
                                    <td>Erat Volutpat</td>
                                    <td><strong>75%</strong></td>
                                    <td>Jul 18, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Gamma project</td>
                                    <td>Anna Jordan</td>
                                    <td>$600,978</td>
                                    <td>Tellus Ltd</td>
                                    <td><strong>18%</strong></td>
                                    <td>Jul 22, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Alpha project</td>
                                    <td>Alice Jackson</td>
                                    <td>$150,161</td>
                                    <td>Nec Euismod In Company</td>
                                    <td><strong>40%</strong></td>
                                    <td>Jul 16, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Project <small>This is example of project</small></td>
                                    <td>Patrick Smith</td>
                                    <td>$160,586</td>
                                    <td>Inceptos Hymenaeos Ltd</td>
                                    <td><strong>20%</strong></td>
                                    <td>Jul 14, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Gamma project</td>
                                    <td>Anna Jordan</td>
                                    <td>$110,612</td>
                                    <td>Tellus Ltd</td>
                                    <td><strong>18%</strong></td>
                                    <td>Jul 22, 2015</td>
                                    <td><a href="#"><i class="fa fa-check text-navy"></i></a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>User activities</h5>
                    </div>
                    <div class="ibox-content">
                        <table class="table table-hover no-margins">
                            <thead>
                            <tr>
                                <th>Status</th>
                                <th>Date</th>
                                <th>User</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><small>Pending...</small></td>
                                <td><i class="fa fa-clock-o"></i> 11:20pm</td>
                                <td>Samantha</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 24% </td>
                            </tr>
                            <tr>
                                <td><span class="label label-warning">Canceled</span> </td>
                                <td><i class="fa fa-clock-o"></i> 10:40am</td>
                                <td>Monica</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 66% </td>
                            </tr>
                            <tr>
                                <td><small>Pending...</small> </td>
                                <td><i class="fa fa-clock-o"></i> 01:30pm</td>
                                <td>John</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 54% </td>
                            </tr>
                            <tr>
                                <td><small>Pending...</small> </td>
                                <td><i class="fa fa-clock-o"></i> 02:20pm</td>
                                <td>Agnes</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 12% </td>
                            </tr>
                            <tr>
                                <td><small>Pending...</small> </td>
                                <td><i class="fa fa-clock-o"></i> 09:40pm</td>
                                <td>Janet</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 22% </td>
                            </tr>
                            <tr>
                                <td><span class="label label-primary">Completed</span> </td>
                                <td><i class="fa fa-clock-o"></i> 04:10am</td>
                                <td>Amelia</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 66% </td>
                            </tr>
                            <tr>
                                <td><small>Pending...</small> </td>
                                <td><i class="fa fa-clock-o"></i> 12:08am</td>
                                <td>Damian</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 23% </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Charts"
    }
</script>

<style scoped>

</style>