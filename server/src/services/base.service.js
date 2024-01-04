const multer = require("multer");

class BaseService {
  constructor(model, imageFieldName) {
    this.model = model;
    this.upload = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 1024 * 1024 * 5, // Example limit: 5MB
      },
    }).single(imageFieldName);
  }

  async saveWithImage(userId, req, data) {
    return new Promise((resolve, reject) => {
      this.upload(req, null, async (err) => {
        if (err) {
          reject({ message: "Error uploading file", error: err.message });
        } else {
          try {
            if (req.file) {
              const fileBuffer = req.file.buffer;
              const base64Image = fileBuffer.toString("base64");
              data.image = base64Image;
            }
            //logged user id to pass
            data.userId = userId;

            const newModel = new this.model(data);
            const savedModel = await newModel.save();
            resolve(savedModel);
          } catch (error) {
            reject({
              message: error.message,
            });
          }
        }
      });
    });
  }

  async saveWithoutImage(userId, data) {
    try {
      //logged user id to pass
      data.userId = userId;
      const newModel = new this.model(data);
      const savedModel = await newModel.save();
      return savedModel;
    } catch (error) {
      throw { message: error.message };
    }
  }

  async getAll() {
    return await this.model.find();
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async updateWithImage(userId, id, req, updatedData) {
    return new Promise((resolve, reject) => {
      this.upload(req, null, async (err) => {
        if (err) {
          reject({ message: "Error uploading file", error: err.message });
        } else {
          try {
            const existingModel = await this.model.findById(id);

            if (!existingModel) {
              reject({ message: "Model not found" });
              return;
            }
            //user id to passed
            updatedData.userId = userId;

            if (req.file) {
              const fileBuffer = req.file.buffer;
              const base64Image = fileBuffer.toString("base64");
              updatedData[this.imageFieldName] = base64Image;
            }

            Object.assign(existingModel, updatedData);
            const updatedModel = await existingModel.save();
            resolve(updatedModel);
          } catch (error) {
            reject({
              message: error.message,
            });
          }
        }
      });
    });
  }

  async updateWithoutImage(userId, id, updatedData) {
    try {
      const existingModel = await this.model.findById(id);

      if (!existingModel) {
        throw { message: "Model not found" };
      }
      //logged user id to pass
      updatedData.userId = userId;

      Object.assign(existingModel, updatedData);
      const updatedModel = await existingModel.save();
      return updatedModel;
    } catch (error) {
      throw { message: error.message };
    }
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseService;
