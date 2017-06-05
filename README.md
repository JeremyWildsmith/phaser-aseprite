# phaser-aseprite
Aseprite Sprite loader for Phaser


## Summary
A small library for loading / parseing aseprite sprite files into Phaser.Sprite objects.

Aseprite is an open-source frame-by-frame animation tool.
Phaser-CE is a javascript game engine.

## Limitations
- The aseprite sprite file must be exported so that there is a json file containing the frames data (using Array option, not the default HashMap option.)
- The spritesheet has the same name as the json file. I.e, if the frame/tag data is in door.json, the spritesheet must be in the same location and be called door.png
- All frames must have the same frame-rate. By default, the first frame's duration is used throughout the entire animation. Phaser-CE does not allow for durations to be specified on a per frame level.
- Aseprite tags signify animations.

## Contributions
You are open to contibute to and expand on this library.

## Dependencies
- Phaser-CE
- path from nodejs
- typedjson

## Useage

The below is an example within a Phaser-CE State class.

Preload will preload the required spritesheet, and Create will build a sprite will all the animations from an aseprite file.

'''typescript
    public preload() {
        AsepriteSpriteFactory.preload(this.game, this.sprite);
    }

    public create() {
        var sprite = AsepriteSpriteFactory.create(this.game, this.sprite);
        this.game.add.existing(sprite);
        sprite.animations.play("close");
    }
'''
