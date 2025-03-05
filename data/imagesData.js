class Image {
    constructor(
    // this sets up this.id like vanilla
    id, 
    //this sets up this.path 
    path) {
        this.id = id;
        this.path = path;
    }
    // for future development and if i need to format quotes
    display() {
        return `${this.id} - ${this.path}`;
    }
}
const rawImage = [
    { id: 1, path: "css/images/1.png" },
    { id: 2, path: "css/images/2.png" },
    { id: 3, path: "css/images/3.png" },
    { id: 4, path: "css/images/4.png" },
    { id: 5, path: "css/images/5.png" },
    { id: 6, path: "css/images/6.png" },
    { id: 7, path: "css/images/7.png" },
    { id: 8, path: "css/images/8.png" },
    { id: 9, path: "css/images/9.png" },
    { id: 10, path: "css/images/10.png" },
    { id: 11, path: "css/images/11.png" },
    { id: 12, path: "css/images/12.png" },
    { id: 13, path: "css/images/13.png" },
    { id: 14, path: "css/images/14.png" },
    { id: 15, path: "css/images/15.png" },
];
export const imagesData = rawImage.map(image => new Image(image.id, image.path));
