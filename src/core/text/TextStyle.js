var EventEmitter = require('eventemitter3'),
    utils = require('../utils');

/**
 * A TextStyle Object decorates a Text Object. It acts as an event emitter, and can be shared between
 * multiple Text objects.
 *
 * @class
 * @extends EventEmitter
 * @memberof PIXI
 * @param [style] {object} The style parameters
 * @param [style.font='bold 20pt Arial'] {string} The style and size of the font
 * @param [style.fill='black'] {String|Number} A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'
 * @param [style.align='left'] {string} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
 * @param [style.stroke='black'] {String|Number} A canvas fillstyle that will be used on the text stroke e.g 'blue', '#FCFF00'
 * @param [style.strokeThickness=0] {number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param [style.wordWrap=false] {boolean} Indicates if word wrap should be used
 * @param [style.wordWrapWidth=100] {number} The width at which text will wrap, it needs wordWrap to be set to true
 * @param [style.lineHeight] {number} The line height, a number that represents the vertical space that a letter uses
 * @param [style.dropShadow=false] {boolean} Set a drop shadow for the text
 * @param [style.dropShadowColor='#000000'] {string} A fill style to be used on the dropshadow e.g 'red', '#00FF00'
 * @param [style.dropShadowAngle=Math.PI/4] {number} Set a angle of the drop shadow
 * @param [style.dropShadowDistance=5] {number} Set a distance of the drop shadow
 * @param [style.dropShadowBlur=0] {number} Set a shadow blur radius
 * @param [style.padding=0] {number} Occasionally some fonts are cropped on top or bottom. Adding some padding will
 *      prevent this from happening by adding padding to the top and bottom of text height.
 * @param [style.textBaseline='alphabetic'] {string} The baseline of the text that is rendered.
 * @param [style.lineJoin='miter'] {string} The lineJoin property sets the type of corner created, it can resolve
 *      spiked text issues. Default is 'miter' (creates a sharp corner).
 * @param [style.miterLimit=10] {number} The miter limit to use when using the 'miter' lineJoin mode. This can reduce
 *      or increase the spikiness of rendered text.
 */
function TextStyle(style)
{
    EventEmitter.call(this);
    var properties = Object.assign({}, this._defaults, style);
    for (var property in properties)
    {
        this[property] = properties[property];
    }
}

TextStyle.prototype = Object.create(EventEmitter.prototype);
TextStyle.prototype.constructor = TextStyle;
module.exports = TextStyle;

// Default settings. Explained in the constructor.
TextStyle.prototype._defaults = {
    align: 'left',
    dropShadow: false,
    dropShadowAngle: Math.PI / 6,
    dropShadowBlur: 0,
    dropShadowColor: '#000000',
    dropShadowDistance: 5,
    lineHeight: null,
    lineJoin: 'miter',
    fill: 'black',
    font: 'bold 20pt Arial',
    miterLimit: 10,
    padding: 0,
    stroke: 'black',
    strokeThickness: 0,
    textBaseline: 'alphabetic',
    wordWrap: false,
    wordWrapWidth: 100
};

/**
 * Creates a new TextStyle object with the same values as this one.
 * Note that the only the properties of the object are cloned, not its event emitter.
 *
 * @return {PIXI.TextStyle}
 */
TextStyle.prototype.clone = function ()
{
    var clonedProperties = {};
    for (var key in this._defaults)
    {
        clonedProperties[key] = this[key];
    }
    return new TextStyle(clonedProperties);
};

/**
 * Create setters and getters for each of the style properties. Converts colors where necessary.
 * Any set operation will emit a styleChanged event.
 */
Object.defineProperties(TextStyle.prototype, {
    font: {
        get: function ()
        {
            return this._font;
        }, set: function (font)
        {
            if (this._font !== font)
            {
                this._font = font;
                this.emit('styleChanged');
            }
        }
    },
    fill: {
        get: function ()
        {
            return this._fill;
        }, set: function (fill)
        {
            var outputColor = typeof fill === 'number' ? utils.hex2string(fill) : fill;
            if (this._fill !== outputColor)
            {
                this._fill = outputColor;
                this.emit('styleChanged');
            }
        }
    },
    align: {
        get: function ()
        {
            return this._align;
        }, set: function (align)
        {
            if (this._align !== align)
            {
                this._align = align;
                this.emit('styleChanged');
            }
        }
    },
    stroke: {
        get: function ()
        {
            return this._stroke;
        }, set: function (stroke)
        {
            var outputColor = typeof stroke === 'number' ? utils.hex2string(stroke) : stroke;
            if (this._stroke !== outputColor)
            {
                this._stroke = outputColor;
                this.emit('styleChanged');
            }
        }
    },
    strokeThickness: {
        get: function ()
        {
            return this._strokeThickness;
        }, set: function (strokeThickness)
        {
            if (this._strokeThickness !== strokeThickness)
            {
                this._strokeThickness = strokeThickness;
                this.emit('styleChanged');
            }
        }
    },
    wordWrap: {
        get: function ()
        {
            return this._wordWrap;
        }, set: function (wordWrap)
        {
            if (this._wordWrap !== wordWrap)
            {
                this._wordWrap = wordWrap;
                this.emit('styleChanged');
            }
        }
    },
    wordWrapWidth: {
        get: function ()
        {
            return this._wordWrapWidth;
        }, set: function (wordWrapWidth)
        {
            if (this._wordWrapWidth !== wordWrapWidth)
            {
                this._wordWrapWidth = wordWrapWidth;
                this.emit('styleChanged');
            }
        }
    },
    dropShadow: {
        get: function ()
        {
            return this._dropShadow;
        }, set: function (dropShadow)
        {
            if (this._dropShadow !== dropShadow)
            {
                this._dropShadow = dropShadow;
                this.emit('styleChanged');
            }
        }
    },
    dropShadowColor: {
        get: function ()
        {
            return this._dropShadowColor;
        }, set: function (dropShadowColor)
        {
            var outputColor = typeof dropShadowColor === 'number' ? utils.hex2string(dropShadowColor) : dropShadowColor;
            if (this._dropShadowColor !== outputColor)
            {
                this._dropShadowColor = outputColor;
                this.emit('styleChanged');
            }
        }
    },
    dropShadowAngle: {
        get: function ()
        {
            return this._dropShadowAngle;
        }, set: function (dropShadowAngle)
        {
            if (this._dropShadowAngle !== dropShadowAngle)
            {
                this._dropShadowAngle = dropShadowAngle;
                this.emit('styleChanged');
            }
        }
    },
    dropShadowDistance: {
        get: function ()
        {
            return this._dropShadowDistance;
        }, set: function (dropShadowDistance)
        {
            if (this._dropShadowDistance !== dropShadowDistance)
            {
                this._dropShadowDistance = dropShadowDistance;
                this.emit('styleChanged');
            }
        }
    },
    dropShadowBlur: {
        get: function ()
        {
            return this._dropShadowBlur;
        }, set: function (dropShadowBlur)
        {
            if (this._dropShadowBlur !== dropShadowBlur)
            {
                this._dropShadowBlur = dropShadowBlur;
                this.emit('styleChanged');
            }
        }
    },
    padding: {
        get: function ()
        {
            return this._padding;
        }, set: function (padding)
        {
            if (this._padding !== padding)
            {
                this._padding = padding;
                this.emit('styleChanged');
            }
        }
    },
    textBaseline: {
        get: function ()
        {
            return this._textBaseline;
        }, set: function (textBaseline)
        {
            if (this._textBaseline !== textBaseline)
            {
                this._textBaseline = textBaseline;
                this.emit('styleChanged');
            }
        }
    },
    lineJoin: {
        get: function ()
        {
            return this._lineJoin;
        }, set: function (lineJoin)
        {
            if (this._lineJoin !== lineJoin)
            {
                this._lineJoin = lineJoin;
                this.emit('styleChanged');
            }
        }
    },
    lineHeight: {
        get: function ()
        {
            return this._lineHeight;
        }, set: function (lineHeight)
        {
            if (this._lineHeight !== lineHeight)
            {
                this._lineHeight = lineHeight;
                this.emit('styleChanged');
            }
        }
    },
    miterLimit: {
        get: function ()
        {
            return this._miterLimit;
        }, set: function (miterLimit)
        {
            if (this._miterLimit !== miterLimit)
            {
                this._miterLimit = miterLimit;
                this.emit('styleChanged');
            }
        }
    }
});


