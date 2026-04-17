import type { INodeProperties } from 'n8n-workflow';

export const facebookPostOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['facebookPost'] } },
		options: [
			{
				name: 'Get Post ID',
				value: 'getPostId',
				action: 'Get a facebook post id',
				description: 'Extract the Facebook post ID from a given post link',
				routing: {
					request: { method: 'GET', url: '/facebook/posts/id', qs: { link: '={{$parameter.postLink}}' } },
				},
			},
			{
				name: 'Get Post Details',
				value: 'getPostDetails',
				action: 'Get facebook post details',
				description: 'Get detailed data about a post including reactions, media, and user info',
				routing: {
					request: { method: 'GET', url: '/facebook/posts/details', qs: { link: '={{$parameter.postLink}}' } },
				},
			},
			{
				name: 'Get Post Attachments',
				value: 'getPostAttachments',
				action: 'Get facebook post attachments',
				description: 'Get details of all media attachments for a given post',
				routing: {
					request: { method: 'GET', url: '/facebook/posts/attachments', qs: { post_id: '={{$parameter.postId}}' } },
				},
			},
			{
				name: 'Get Video Details',
				value: 'getVideoDetails',
				action: 'Get facebook video details',
				description: 'Retrieve video metadata, feedback stats, and post context',
				routing: {
					request: { method: 'GET', url: '/facebook/posts/video', qs: { video_id: '={{$parameter.videoId}}' } },
				},
			},
			{
				name: 'Get Post Comments',
				value: 'getPostComments',
				action: 'Get facebook post comments',
				description: 'Retrieve top-level comments from a post or reel. Returns 10 comments per call. Use end_cursor for more.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/posts/comments',
						qs: {
							link: '={{$parameter.postLink}}',
							end_cursor: '={{$parameter.additionalFields.end_cursor}}',
							include_reply_info: '={{$parameter.additionalFields.include_reply_info}}',
						},
					},
				},
			},
			{
				name: 'Get Comment Replies',
				value: 'getCommentReplies',
				action: 'Get facebook comment replies',
				description: 'Fetch replies to a specific comment. Requires comment_feedback_id and expansion_token from comments endpoint.',
				routing: {
					request: {
						method: 'GET',
						url: '/facebook/posts/comments/replies',
						qs: {
							comment_feedback_id: '={{$parameter.commentFeedbackId}}',
							expansion_token: '={{$parameter.expansionToken}}',
						},
					},
				},
			},
		],
		default: 'getPostDetails',
	},
	// --- Post Link (for ID, Details, Comments) ---
	{
		displayName: 'Post URL',
		name: 'postLink',
		type: 'string',
		required: true,
		description: 'The Facebook post or reel URL',
		default: '',
		displayOptions: { show: { operation: ['getPostId', 'getPostDetails', 'getPostComments'] } },
	},
	// --- Post ID (for Attachments) ---
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		description: 'The Facebook Post ID',
		default: '',
		displayOptions: { show: { operation: ['getPostAttachments'] } },
	},
	// --- Video ID ---
	{
		displayName: 'Video ID',
		name: 'videoId',
		type: 'string',
		required: true,
		description: 'The Facebook Video ID',
		default: '',
		displayOptions: { show: { operation: ['getVideoDetails'] } },
	},
	// --- Comment Replies fields ---
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
		description: 'Max number of results to return. Comments return 10 items per API call by default.',
		displayOptions: { show: { operation: ['getPostComments'] } },
	},
	{
		displayName: 'Comment Feedback ID',
		name: 'commentFeedbackId',
		type: 'string',
		required: true,
		description: 'The feedback ID of the parent comment. Obtained from comments endpoint with include_reply_info=true.',
		default: '',
		displayOptions: { show: { operation: ['getCommentReplies'] } },
	},
	{
		displayName: 'Expansion Token',
		name: 'expansionToken',
		type: 'string',
		required: true,
		description: 'Pagination token for loading replies. Obtained from comments endpoint with include_reply_info=true.',
		default: '',
		displayOptions: { show: { operation: ['getCommentReplies'] } },
	},
	// --- Additional Fields for Comments ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: { operation: ['getPostComments'] } },
		default: {},
		options: [
			{ displayName: 'End Cursor', name: 'end_cursor', type: 'string', default: '', description: 'Pagination cursor to retrieve the next page of comments' },
			{ displayName: 'Include Reply Info', name: 'include_reply_info', type: 'boolean', default: false, description: 'Whether to include comment_feedback_id and expansion_token for fetching replies' },
		],
	},
];
