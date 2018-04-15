let actions = {
  get_rank_by_league: function(leagueId) {
		return function(dispatch, getState) {
			if (getState().rank.isLoading){
				return;
			}
			dispatch(actions.begin_load_data());				
			fetch('shuju/public/index.php?_url=/data/index&league='+ leagueId +'&tab=积分榜&year=[year]',{
				method: 'GET'
			}).then((res)=>{
				return res.text()
			})
			.then((res)=>{
				// console.log(res)
				let result = JSON.parse(res)
				if (result.code==200) {
					dispatch(actions.load_rank_success(res.data));
				}
			})
		}
	},
		
	get_news: function() {
		return function(dispatch, getState){
			if (getState().rank.isLoading){
				return;
			}
			fetch('http://localhost:3000/PickNews', {
				method: 'GET'
			}).then((res)=>{
				return res.text()
			})
			.then((res)=>{
				//console.log(res)
				let result = JSON.parse(res)
				if (result.code==200) {
					dispatch(actions.load_news_success(result.data));
				}
			})
		}
	},

	update_title: function(title) {
		return function (dispatch, getState) {
			dispatch(actions.change_img_title(title));
		}
	},

    begin_load_data: () => ({
        type: 'rank/BEGIN_LOAD_DATA'
    }),

    load_rank_success: rankList => ({
        type: 'rank/LOAD_RANK_SUCCESS',
        payload: rankList
    }),

    load_fail: errMsg => ({
        type: 'rank/LOAD_FAIL',
        payload: new Error(errMsg),
        error: true
    }),

    load_team_success: teamId => ({
        type: 'rank/LOAD_TEAM_SUCCESS',
        payload: teamId
		}),
		
	load_news_success: newsList => ({
		type: 'rank/LOAD_NEWS_SUCCESS',
		payload: newsList
	}),

	change_img_title: title => ({
		type: 'rank/CHANGE_IMG_TITLE',
		payload: title
	})

};
export default actions;