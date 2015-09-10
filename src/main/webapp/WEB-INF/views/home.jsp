<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet"
	href="./libs/css/bootstrap.min.css" />
<link rel="stylesheet" href="./libs/assets/css/font-awesome.min.css" />
<link rel="stylesheet" href="./libs/assets/css/ace-fonts.css" />
<link rel="stylesheet" href="./libs/assets/css/ace.min.css"
	id="main-ace-style" />

<style>
body {
	background: #E4E6E9;
}

.main-container {
	padding-top: 72px;
}

.navbar-inverse {
	background-color: #438EB9;
	border-bottom-color: rgba(0, 0, 0, 0.33);
}

.navbar-inverse .navbar-brand {
	color: #EEE;
}

hr {
	border-width: 0;
	margin-top: 6px;
	margin-bottom: 6px;
}
</style>
</head>
<body ng-app="myApp">
	<div class="container" ng-controller="AppController">
		
		<div class="alert alert-info" role="alert"
			ng-hide="items && items.length > 0">There are no items yet.</div>
		<div class="page-content-area">
			<div class="page-header">
				<h1>Project list</h1>
			</div>

		</div>

		<form class="form-horizontal" role="form" ng-submit="addItem(newItem)">
			<div class="input-group">
			
				<input type="text" class="form-control" ng-model="newItem"
					placeholder="Enter project name..." 
					style="width:200px"/> 
					<span class="input-group-btn" > 
					
					<div class="hidden-sm hidden-xs btn-group">
						<button class="btn btn-xs btn-success" type="submit"
							ng-disabled="!newItem">
							<i class="ace-icon fa fa-check bigger-120"></i>
						</button>
					</div>
					
				</span>
			</div>
			<hr/>
			<div class="row">
				<div class="col-xs-12">
					<table id="sample-table-1"
						class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th class="center"><label class="position-relative">
										<input type="checkbox" class="ace" /> <span class="lbl"></span>
								</label></th>
								<th>Name</th>
								<th>Description</th>

								<th><i class="ace-icon fa fa-clock-o bigger-110 hidden-480"></i>
									Start Date</th>
								<th><i class="ace-icon fa fa-clock-o bigger-110 hidden-480"></i>
									End Date</th>
								<th class="hidden-480">Project Lead</th>
								<th>Operations</th>
							</tr>
						</thead>
						<tbody>

							<tr ng-repeat="item in items">
								<td class="center"><label class="position-relative">
										<input type="checkbox" class="ace" ng-model="item.checked"
										ng-change="updateItem(item)" /> <span class="lbl"></span>
								</label></td>

								<td><a href="#">{{item.description}}</a></td>
								<td></td>
								<td>Start Date</td>
								<td>End date</td>
								<td>Lead</td>
								<td>
									<div class="hidden-sm hidden-xs action-buttons"
										ng-click="deleteItem(item)">
										<a class="red" href="#"> <i
											class="ace-icon fa fa-trash-o bigger-130"></i>
										</a>
									</div>
								</td>

							</tr>
						</tbody>
					</table>


				</div>
			</div>
			
		</form>
	</div>
	<script type="text/javascript" src="./libs/angular/angular.min.js"></script>
	<script type="text/javascript"
		src="./libs/angular-resource/angular-resource.min.js"></script>
	<script type="text/javascript"
		src="./libs/angular-spring-data-rest/dist/angular-spring-data-rest.min.js"></script>
	<script type="text/javascript" src="./libs/lodash/dist/lodash.min.js"></script>
	<script type="text/javascript" src="./assets/js/ace-extra.min.js"></script>
	<script type="text/javascript" src="./app/app.js"></script>
	<script type="text/javascript" src="./app/controllers.js"></script>
	<script type="text/javascript" src="./app/services.js"></script>

</body>
</html>