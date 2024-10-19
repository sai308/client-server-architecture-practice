class Developer {
  /**
   * @param {Entities.Developer} params
   */
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

module.exports = { Developer };
