function bookingListCtrl() {
	// 初始化表格
	$('#testTable').datagrid({
		title:'出口托单列表',
		//iconCls:'icon-edit',
		width: 1200,
		height: 550,
		nowrap: false,
		//striped: true,
		//collapsible:true,
		url:'testData/datagrid_data.json',
		sortName: 'code',
		sortOrder: 'desc',
		remoteSort: true,
		idField:'code',
		frozenColumns:[[
            {title:'ID',field:'id',width:80,sortable:true}
		]],
		columns:[[
			{field:'tip', title:'订舱提示',width:120, sortable:true},
			{field:'unit', title:'订舱单位', width:150},
			{field:'no', title:'提单号', width:150},
			{field:'boxNum', title:'箱数量',width:150, sortable:true,
				sorter:function(a,b){
					return (a>b?1:-1);
				}
			},
			{field:'port', title:'所属港', width:200},
			{field:'date', title:'船期', width:200},
			{field:'opt',title:'Operation',width:100,align:'center', rowspan:2,
				formatter:function(value,rec){
					return '<span style="color:red">Edit Delete</span>';
				}
			}
		]],
		pagination:true,
		pageSize:10,
		pageList: [10, 20],
		rownumbers:true,
		toolbar:[{
			id:'btnadd',
			text:'Add',
			iconCls:'icon-add',
			handler:function(){
				$('#btnsave').linkbutton('enable');
				alert('add')
			}
		}],
		onDblClickRow: function(index, rowData) {
			
			$('#content').html('提单号 : ' + rowData.no);
			$('#detailContainer').dialog('open');
		}
	});
	
	// 分页部分
	var p = $('#testTable').datagrid('getPager');
	$(p).pagination({
		onBeforeRefresh:function(){
			//alert('before refresh');
		}
	});
	
	// 查询
	$('#searchBtn').click(function() {
		$('#searchForm').form('submit', {  
		    url: 'testData/datagrid_data.json',  
		    onSubmit: function(){  
		    },  
		    success:function(data){
		    	console.log(data)
		    	$('#testTable').datagrid('loadData', JSON.parse(data))
		    }  
		});  
	})
	
	// 添加/更新
	$('#detailContainer').dialog({
		title: 'xxx',
		toolbar:[{
			text:'Add',
			iconCls:'icon-add',
			handler:function(){
				alert('add')
			}
		},'-',{
			text:'Save',
			iconCls:'icon-save',
			handler:function(){
				alert('save')
			}
		}],
		buttons:[{
			text:'Ok',
			iconCls:'icon-ok',
			handler:function(){
				$('#detailContainer').dialog('close');
			}
		},{
			text:'Cancel',
			handler:function(){
				$('#detailContainer').dialog('close');
			}
		}]
	});
	
	
	$('#detailContainer').dialog('close');
}