import { JsonMember, JsonObject, TypedJSON } from "typedjson-npm/js/typed-json";

import Path = require("path");

export class AsepriteSpriteFactory {
    public static create(game: Phaser.Game, source: string): Phaser.Sprite {
        var def: AsepriteSpriteDefinition = TypedJSON.parse(game.cache.getText(source), AsepriteSpriteDefinition);

        if (def.frames.length === 0)
            throw new Error("Aseprite file contains no frames.");

        if (def.meta.frameTags.length === 0)
            throw new Error("Aseprite file containts no animations (tags.)");

        var sprite = new Phaser.Sprite(game, 0, 0, AsepriteSpriteFactory.getSpritesheetPath(source), 0);
        
        def.frames.forEach(function (frame: FrameDefinition, index: number) {
            sprite.animations.frameData.addFrame(new Phaser.Frame(index + 1, frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h, index.toString()));
        });

        def.meta.frameTags.forEach(function (tag: FrameTagDefinition) {
            var frameIndice: Array<number> = new Array(tag.to + 1);

            for (var i = 0; i < frameIndice.length; i++) {
                frameIndice[i] = i + 1;
            }

            if (tag.direction === "reverse") {
                frameIndice.reverse();
            }

            sprite.animations.add(tag.name, frameIndice, 1 / (def.frames[frameIndice[0] - 1].duration / 1000), tag.direction === "pingpong", true);
        });

        return sprite;
    }

    public static preload(game: Phaser.Game, source: string) {
        var spriteSheetPath: string = AsepriteSpriteFactory.getSpritesheetPath(source);

        game.load.image(spriteSheetPath, spriteSheetPath);
    }

    private static getSpritesheetPath(source: string): string {
        return Path.join(Path.dirname(source), Path.basename(source, Path.extname(source))) + ".png";
    }
}

@JsonObject
class FrameDimensions {
    @JsonMember({ type: Number })
    public x: number;

    @JsonMember({ type: Number })
    public y: number;

    @JsonMember({ type: Number })
    public w: number;

    @JsonMember({ type: Number })
    public h: number;
}

@JsonObject({ knownTypes: [FrameDimensions] })
class FrameTagDefinition {
    @JsonMember({ type: String })
    public name: string;

    @JsonMember({ type: Number })
    public from: number;

    @JsonMember({ type: Number })
    public to: number;

    @JsonMember({ type: String })
    public direction: string;
}

@JsonObject({ knownTypes: [FrameTagDefinition] })
class AsepriteMetaDefinition {
    @JsonMember({ elements: FrameTagDefinition })
    public frameTags: FrameTagDefinition[];
}

@JsonObject({ knownTypes: [FrameDimensions] })
class FrameDefinition {
    @JsonMember({ type: Number })
    public duration: number;

    @JsonMember({ type: FrameDimensions })
    public frame: FrameDimensions;
}

@JsonObject({ knownTypes: [AsepriteMetaDefinition, FrameDefinition] })
class AsepriteSpriteDefinition {
    @JsonMember({ type: AsepriteMetaDefinition })
    public meta: AsepriteMetaDefinition;

    @JsonMember({ elements: FrameDefinition })
    public frames: FrameDefinition[];
}