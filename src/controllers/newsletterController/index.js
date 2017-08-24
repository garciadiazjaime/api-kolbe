import NewsLetterModel from '../../models/newsLetterModel';

export default class NewsletterController {

  list(params) {
    const filter = {
      status: true,
      groupId: params.groupId,
    };
    return NewsLetterModel.find(filter);
  }

  get(newsLetterId) {
    const filter = {
      _id: newsLetterId,
      status: true,
    };
    return NewsLetterModel.findOne(filter);
  }

  save(data) {
    const activityModel = new NewsLetterModel(data);
    return activityModel.save();
  }

  update(newsLetterId, data) {
    const filter = {
      _id: newsLetterId,
    };
    return NewsLetterModel.update(filter, data);
  }

  delete(newsLetterId) {
    const filter = {
      _id: newsLetterId,
    };
    return NewsLetterModel.remove(filter);
  }
}
