import { fromJS,List } from 'immutable'; 

const initialState = {
    isLoading: false,
    rankList: [],
    teamInfo: {},
    player: {},
    NBAList: [],
    pictureList: [],
    pictureSet: [],
    news: [],
    imgTitle: ''
};


export default (state = initialState, action) => {
    let newState ;
    const { type, payload } = action;
    switch (type) {
        case 'rank/BEGIN_LOAD_DATA':
						return 
							fromJS(state)
								.set('isLoading', true)
								.toJS();

        case 'rank/load_rank_success':
            return Object.assign({}, state, {
                rankList: payload,
                isLoading: false
            });

        case 'rank/load_fail':
            return fromJS(state).set('isLoading', false).toJS();

        case 'rank/LOAD_NEWS_SUCCESS':
            return Object.assign({}, state, {
                news: payload,
                isLoading: false
            });

        case 'rank/EAT_APPLE':
						return fromJS(state).setIn(['apples', payload, 'isEaten'], true).toJS();

				case 'rank/CHANGE_IMG_TITLE':
						console.log(payload)
					return Object.assign({}, state, {
									imgTitle: payload
								});
        default:
            return state;
    }
};
