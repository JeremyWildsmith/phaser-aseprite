"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typed_json_1 = require("typedjson-npm/js/typed-json");
var Path = require("path");
var AsepriteSpriteFactory = (function () {
    function AsepriteSpriteFactory() {
    }
    AsepriteSpriteFactory.create = function (game, source) {
        var def = typed_json_1.TypedJSON.parse(game.cache.getText(source), AsepriteSpriteDefinition);
        if (def.frames.length === 0)
            throw new Error("Aseprite file contains no frames.");
        if (def.meta.frameTags.length === 0)
            throw new Error("Aseprite file containts no animations (tags.)");
        var sprite = new Phaser.Sprite(game, 0, 0, AsepriteSpriteFactory.getSpritesheetPath(source), 0);
        def.frames.forEach(function (frame, index) {
            sprite.animations.frameData.addFrame(new Phaser.Frame(index + 1, frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h, index.toString()));
        });
        def.meta.frameTags.forEach(function (tag) {
            var frameIndice = new Array(tag.to - tag.from + 1);
            for (var i = 0; i < frameIndice.length; i++) {
                frameIndice[i] = i + tag.from + 1;
            }
            if (tag.direction === "reverse") {
                frameIndice.reverse();
            }
            sprite.animations.add(tag.name, frameIndice, 1 / (def.frames[frameIndice[0] - 1].duration / 1000), tag.direction === "pingpong", true);
        });
        return sprite;
    };
    AsepriteSpriteFactory.preload = function (game, source) {
        var spriteSheetPath = AsepriteSpriteFactory.getSpritesheetPath(source);
        if (!game.cache.checkImageKey(spriteSheetPath))
            game.load.image(spriteSheetPath, spriteSheetPath);
    };
    AsepriteSpriteFactory.getSpritesheetPath = function (source) {
        return Path.join(Path.dirname(source), Path.basename(source, Path.extname(source))) + ".png";
    };
    return AsepriteSpriteFactory;
}());
exports.AsepriteSpriteFactory = AsepriteSpriteFactory;
var FrameDimensions = (function () {
    function FrameDimensions() {
    }
    return FrameDimensions;
}());
__decorate([
    typed_json_1.JsonMember({ type: Number })
], FrameDimensions.prototype, "x", void 0);
__decorate([
    typed_json_1.JsonMember({ type: Number })
], FrameDimensions.prototype, "y", void 0);
__decorate([
    typed_json_1.JsonMember({ type: Number })
], FrameDimensions.prototype, "w", void 0);
__decorate([
    typed_json_1.JsonMember({ type: Number })
], FrameDimensions.prototype, "h", void 0);
FrameDimensions = __decorate([
    typed_json_1.JsonObject
], FrameDimensions);
var FrameTagDefinition = (function () {
    function FrameTagDefinition() {
    }
    return FrameTagDefinition;
}());
__decorate([
    typed_json_1.JsonMember({ type: String })
], FrameTagDefinition.prototype, "name", void 0);
__decorate([
    typed_json_1.JsonMember({ type: Number })
], FrameTagDefinition.prototype, "from", void 0);
__decorate([
    typed_json_1.JsonMember({ type: Number })
], FrameTagDefinition.prototype, "to", void 0);
__decorate([
    typed_json_1.JsonMember({ type: String })
], FrameTagDefinition.prototype, "direction", void 0);
FrameTagDefinition = __decorate([
    typed_json_1.JsonObject({ knownTypes: [FrameDimensions] })
], FrameTagDefinition);
var AsepriteMetaDefinition = (function () {
    function AsepriteMetaDefinition() {
    }
    return AsepriteMetaDefinition;
}());
__decorate([
    typed_json_1.JsonMember({ elements: FrameTagDefinition })
], AsepriteMetaDefinition.prototype, "frameTags", void 0);
AsepriteMetaDefinition = __decorate([
    typed_json_1.JsonObject({ knownTypes: [FrameTagDefinition] })
], AsepriteMetaDefinition);
var FrameDefinition = (function () {
    function FrameDefinition() {
    }
    return FrameDefinition;
}());
__decorate([
    typed_json_1.JsonMember({ type: Number })
], FrameDefinition.prototype, "duration", void 0);
__decorate([
    typed_json_1.JsonMember({ type: FrameDimensions })
], FrameDefinition.prototype, "frame", void 0);
FrameDefinition = __decorate([
    typed_json_1.JsonObject({ knownTypes: [FrameDimensions] })
], FrameDefinition);
var AsepriteSpriteDefinition = (function () {
    function AsepriteSpriteDefinition() {
    }
    return AsepriteSpriteDefinition;
}());
__decorate([
    typed_json_1.JsonMember({ type: AsepriteMetaDefinition })
], AsepriteSpriteDefinition.prototype, "meta", void 0);
__decorate([
    typed_json_1.JsonMember({ elements: FrameDefinition })
], AsepriteSpriteDefinition.prototype, "frames", void 0);
AsepriteSpriteDefinition = __decorate([
    typed_json_1.JsonObject({ knownTypes: [AsepriteMetaDefinition, FrameDefinition] })
], AsepriteSpriteDefinition);
//# sourceMappingURL=AsepriteSpriteFactory.js.map